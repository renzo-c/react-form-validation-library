Creating a library for validation purposes

This is a proof of concept that shows a validation feature made from scratch.
Available validation modes: always, blur, and submit 

Libraries:
styled-components: For style purposes
react-spring: To animate the background
calidators: Set of validators

Tools:
Reducers: To centralize state management
Hooks: To return all validation-related variables and methods from local storage (useValidate)
Context: To provide the whole project with what the hook useValidate returns 
useRef to implement modal-closing when clicking away


References: https://www.smashingmagazine.com/2019/05/react-validation-library-features-part2/


