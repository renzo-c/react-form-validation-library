# Creating a library for validation purposes

This is a proof of concept that implements form validation from scratch by using state management, hooks and contexts.  
<br/>
Available validation modes: always, blur, and submit.

See <a href="https://validation-library.herokuapp.com/" target="_blank">Demo</a>

<p align="center">
  <img align="center" width="295" height="180" src="/src/utils/images/validate.png">
</p>

## Libraries:
- styled-components: For style purposes
- react-spring: To animate the background
- calidators: Set of validators
## Tools:
- Reducers: To centralize state management
- Hooks useValidate: To return all validation-related variables and methods from local storage
- Context: To provide the whole project with what the hook useValidate returns 
- Hook useRef: to implement modal-closing when clicking away

#### References: https://www.smashingmagazine.com/2019/05/react-validation-library-features-part2/
