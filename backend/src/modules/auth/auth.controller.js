import * as service from './auth.service.js'

function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }
}

export async function register(req, res, next) {
  try {
    const user = await service.register(req.body)
    res.status(201).json({ data: user })
  } catch (err) {
    next(err)
  }
}

export async function login(req, res, next) {
  try {
    const result = await service.login(req.body, {
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    })
    res.cookie('okoa_session', result.token, cookieOptions())
    res.json({ data: result.user })
  } catch (err) {
    next(err)
  }
}

export async function me(req, res, next) {
  try {
    const user = await service.getCurrentUser(req.user.id)
    if (!user) {
      const err = new Error('User not found')
      err.status = 404
      err.code = 'USER_NOT_FOUND'
      throw err
    }
    res.json({ data: user })
  } catch (err) {
    next(err)
  }
}

export async function logout(req, res, next) {
  try {
    const token = req.cookies?.okoa_session
    await service.logout(token)
    res.clearCookie('okoa_session', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
    })
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
