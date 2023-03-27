import ActionStateType from '@/types/ActionStateType';
import FormStateType from '@/types/FormStateType';
import UserType from '@/types/UserType';

const formReducer = <T>(state: T, action: ActionStateType): FormStateType => {
  switch (action.type) {
    case 'start-login': {
      return {
        ...state,
        status: 'login-pending'
      };
    }
    case 'login': {
        return {
          ...state,
          user: action.result as UserType,
          status: action.result ? 'successful-login' : 'login-failed'
        };
    
    }
    case 'start-registration': {
      return {
        ...state,
        status: 'registration-pending'
      };
    }
    case 'register': { 
        return {
          ...state,
          user: null,
          users: action.result as UserType[],
          status: action.result ?  'successful-registration' : 'registration-failed'
        };
    }
  }

  return {} as FormStateType;
};

export default formReducer;
