import { Navigate } from "react-router-dom";
import { autologinUser } from "../services/user.service";
//recibe el estado, en el que esta la data del usuario y la funcion login del contexto
export const useAutoLogin = async (allUser, userLogin) => {
  try {
    const { password, email } = allUser?.data?.user;
    const customFormData = {
      email,
      password,
    };
//este es el serviciio del autologin
    const sendData = await autologinUser(customFormData);

    if (sendData?.status == 200) {
      const { name, email, image, check } = sendData?.data?.user;
      const userCustom = {
        token: sendData.data.token,
        user: name,
        email,
        image,
        check,
        _id: sendData.data.user._id,
      };
//lo hago string para llamar al contexto, que lo metera en el local
      const stringUser = JSON.stringify(userCustom);
      userLogin(stringUser);
      //si va bien lo mando al dashboard porque ya esta logado
      return <Navigate to="/dashboard" />;
    } else {
      //si va mal lo mando al login para que vuelva a intentarlo
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.log(error);
  }
};
