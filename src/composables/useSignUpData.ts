import { reactive } from 'vue'

interface SignUpDataState {
  name: string
  username: string
  instituteEmail: string
  personalEmail: string
  bio: string
}

const signUpData = reactive<SignUpDataState>({
  name: '',
  username: '',
  instituteEmail: '',
  personalEmail: '',
  bio: ''
})

export function useSignUpData() {
  const setSignUpData = (payload: Partial<SignUpDataState>) => {
    Object.assign(signUpData, payload)
  }

  return {
    signUpData,
    setSignUpData
  }
}
