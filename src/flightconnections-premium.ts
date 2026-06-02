const SCRIPT_NAME = '[FlightConnections Premium]'
const SESSION_ID = 'fake-session-123'
const COOKIE_EXPIRE_DAYS = 90

const LS_KEY_USER_ID = 'userID'
const LS_KEY_SESSION_ID = 'sessionID'
const LS_KEY_USER_PROFILE = 'userProfile'
const COOKIE_NAME_USER_ID = 'userID'

const AUTH_HOST = 'auth.flightconnections.com'
const API_VALIDATE = '/validate'
const API_AIRLINE_LISTS = '/airline_lists'
const API_ACCOUNT = '/account'
const API_EXTEND = '/extend'
const FUNC_REVALIDATE = 'revalidateUser'

const CSS_CLASS_FREE = 'free'
const CSS_CLASS_STOP = 'stop'

const PROFILE = {
  account_id: 'fake123',
  account_type: 'member_annually',
  account_name: 'Test User',
  account_email: 'test@example.com',
  account_logo: '',
}

localStorage.setItem(LS_KEY_USER_ID, PROFILE.account_id)
localStorage.setItem(LS_KEY_SESSION_ID, SESSION_ID)
localStorage.setItem(LS_KEY_USER_PROFILE, JSON.stringify(PROFILE))

const w = window as any

w.premiumUser = function () {
  return true
}

w.openPremium = function () {}

w.validateMember = function () {
  localStorage.setItem(LS_KEY_USER_PROFILE, JSON.stringify(PROFILE))
  const userId = localStorage.getItem(LS_KEY_USER_ID)
  if (userId && typeof w.setCookie === 'function')
    w.setCookie(COOKIE_NAME_USER_ID, userId, COOKIE_EXPIRE_DAYS)
}

w.userLoggedIn = function (e: boolean) {
  if (e)
    document.body.classList.remove(CSS_CLASS_FREE)
}

w.loadUserAirlineLists = function () {}

w.manageAccount = function () {}

function removeStopClass() {
  document.body.classList.remove(CSS_CLASS_STOP)
}

removeStopClass()

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (
      mutation.type === 'attributes'
      && mutation.attributeName === 'class'
      && (mutation.target as HTMLElement).classList.contains(CSS_CLASS_STOP)
    ) {
      removeStopClass()
    }
  }
})

observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })

const origSetInterval = window.setInterval
window.setInterval = function (fn: TimerHandler, _delay?: number, ...args: any[]) {
  if (
    typeof fn === 'function'
    && fn.toString().includes(FUNC_REVALIDATE)
  ) {
    return 0
  }
  return origSetInterval.call(this, fn, _delay, ...args)
}

const origAjax = w.$.ajax
w.$.ajax = function (options: any) {
  if (options.url && options.url.includes(AUTH_HOST)) {
    if (options.url.includes(API_VALIDATE)) {
      if (options.success)
        options.success({ result: PROFILE }, 'success')
      return {
        done(fn: any) {
          if (fn)
            fn({ result: PROFILE })
          return this
        },
        fail() {
          return this
        },
      }
    }
    if (options.url.includes(API_AIRLINE_LISTS) || options.url.includes(API_ACCOUNT)) {
      if (options.success)
        options.success({ result: [] }, 'success')
      return {
        done(fn: any) {
          if (fn)
            fn({ result: [] })
          return this
        },
        fail() {
          return this
        },
      }
    }
    if (options.url.includes(API_EXTEND)) {
      if (options.success)
        options.success({ result: true }, 'success')
      return {
        done(fn: any) {
          if (fn)
            fn({ result: true })
          return this
        },
        fail() {
          return this
        },
      }
    }
  }
  return origAjax.call(this, options)
}

console.warn(`${SCRIPT_NAME} Script loaded successfully`)
