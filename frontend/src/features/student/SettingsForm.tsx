'use client'

import { useState } from 'react'

export function SettingsForm() {
  const [saved, setSaved] = useState(false)
  return <form className="settings-layout" onChange={() => setSaved(false)} onSubmit={(event) => { event.preventDefault(); setSaved(true) }}>
    <section className="content-panel settings-panel">
      <div className="settings-section-head"><div><span className="eyebrow">YOUR PROFILE</span><h2>Personal details</h2></div><p>These details are shown only to you in this demo.</p></div>
      <div className="settings-fields"><label>Full name<input defaultValue="Amara Mwangi" /></label><label>Email address<input defaultValue="amara.mwangi@example.edu" type="email" /></label><label>Institution<input defaultValue="University of Nairobi" readOnly /></label><label>Current role<input defaultValue="Student" readOnly /></label></div>
    </section>
    <section className="content-panel settings-panel">
      <div className="settings-section-head"><div><span className="eyebrow">YOUR PREFERENCES</span><h2>Stay in the know</h2></div><p>Choose the updates you would like to see.</p></div>
      <label className="setting-toggle"><span><strong>Deadline reminders</strong><small>Get a heads-up before a confirmed deadline.</small></span><input defaultChecked type="checkbox" /><i /></label>
      <label className="setting-toggle"><span><strong>Course announcements</strong><small>See verified changes and new course information.</small></span><input defaultChecked type="checkbox" /><i /></label>
      <label className="setting-toggle"><span><strong>Weekly overview</strong><small>A simple look at the week ahead.</small></span><input type="checkbox" /><i /></label>
    </section>
    <div className="settings-footer"><span aria-live="polite">{saved ? 'Preferences updated in this preview.' : 'Changes are only saved in this demo preview.'}</span><button className="button button-dark" type="submit">Save preferences</button></div>
  </form>
}
