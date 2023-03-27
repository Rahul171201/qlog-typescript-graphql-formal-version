type formDataType = {
    name: string,
    type: string,
    placeholder: string,
    label: string,
    image: string
}[]

const loginFormData : formDataType = [
    {
      name: "userId",
      type: "text",
      placeholder: "Type your user id",
      label: "User Id",
      image: "/images/user.png",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Type your password",
      label: "Password",
      image: "/images/padlock.png",
    },
  ];
  
  export default loginFormData;
  