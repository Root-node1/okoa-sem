-- Migration: 003_shared_foundations.sql
-- Shared backend foundations for sources, processing, claims, records, audit, and course access.

CREATE TABLE IF NOT EXISTS course_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('student', 'class_rep', 'lecturer')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'removed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_course_memberships_user ON course_memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_course_memberships_course ON course_memberships(course_id);

CREATE TABLE IF NOT EXISTS sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES institutions(id) ON DELETE RESTRICT,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  submitted_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  source_type TEXT NOT NULL CHECK (source_type IN ('text', 'document', 'whatsapp_export')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sources_workspace ON sources(workspace_id);
CREATE INDEX IF NOT EXISTS idx_sources_course ON sources(course_id);
CREATE INDEX IF NOT EXISTS idx_sources_submitted_by ON sources(submitted_by);
CREATE INDEX IF NOT EXISTS idx_sources_status ON sources(status);

CREATE TABLE IF NOT EXISTS source_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
  public_id TEXT NOT NULL,
  resource_type TEXT,
  format TEXT,
  bytes BIGINT,
  mime_type TEXT,
  checksum TEXT,
  extracted_text TEXT,
  text_extraction_status TEXT NOT NULL DEFAULT 'pending' CHECK (text_extraction_status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_source_documents_source ON source_documents(source_id);

CREATE TABLE IF NOT EXISTS processing_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
  job_type TEXT NOT NULL DEFAULT 'extraction',
  status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'processing', 'completed', 'failed')),
  attempts INTEGER NOT NULL DEFAULT 0,
  max_attempts INTEGER NOT NULL DEFAULT 3,
  locked_at TIMESTAMPTZ,
  locked_by TEXT,
  next_retry_at TIMESTAMPTZ,
  last_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (source_id, job_type)
);

CREATE INDEX IF NOT EXISTS idx_processing_jobs_status ON processing_jobs(status);
CREATE INDEX IF NOT EXISTS idx_processing_jobs_retry ON processing_jobs(next_retry_at);

CREATE TABLE IF NOT EXISTS extracted_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
  source_document_id UUID REFERENCES source_documents(id) ON DELETE SET NULL,
  claim_type TEXT NOT NULL CHECK (claim_type IN ('cat', 'exam', 'assignment', 'lecture', 'meeting', 'deadline', 'venue_change', 'announcement', 'material', 'instruction')),
  title TEXT NOT NULL,
  description TEXT,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  course_hint TEXT,
  start_at TIMESTAMPTZ,
  end_at TIMESTAMPTZ,
  venue TEXT,
  confidence NUMERIC(4,3),
  ambiguity_flags JSONB NOT NULL DEFAULT '[]'::jsonb,
  evidence_snippet TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'merged', 'failed')),
  duplicate_of UUID REFERENCES extracted_claims(id) ON DELETE SET NULL,
  conflicts_with JSONB NOT NULL DEFAULT '[]'::jsonb,
  failure_reason TEXT,
  extracted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  model TEXT,
  prompt_version TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_extracted_claims_source ON extracted_claims(source_id);
CREATE INDEX IF NOT EXISTS idx_extracted_claims_course ON extracted_claims(course_id);
CREATE INDEX IF NOT EXISTS idx_extracted_claims_status ON extracted_claims(status);

CREATE TABLE IF NOT EXISTS academic_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES institutions(id) ON DELETE RESTRICT,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('cat', 'exam', 'assignment', 'lecture', 'meeting', 'deadline', 'venue_change', 'announcement', 'material', 'instruction')),
  title TEXT NOT NULL,
  description TEXT,
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ,
  venue TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'verified', 'superseded', 'cancelled')),
  source_claim_id UUID REFERENCES extracted_claims(id) ON DELETE SET NULL,
  version INTEGER NOT NULL DEFAULT 1,
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  verified_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_academic_events_workspace ON academic_events(workspace_id);
CREATE INDEX IF NOT EXISTS idx_academic_events_course ON academic_events(course_id);
CREATE INDEX IF NOT EXISTS idx_academic_events_status ON academic_events(status);
CREATE INDEX IF NOT EXISTS idx_academic_events_start ON academic_events(start_at);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  before_state JSONB,
  after_state JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
