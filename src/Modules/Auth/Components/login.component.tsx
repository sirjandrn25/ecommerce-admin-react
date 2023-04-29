import Button from "@Components/Button/button.component";
import { FormInterface } from "@Composites/FormBuilder/Types/form.types";
import FormBuilder from "@Composites/FormBuilder/formBuilder";
import { BASE_URL } from "@Constants/api.constant";
import { AUTH_ROUTE } from "@Constants/route.constant";
import useNavigation from "@Hooks/useNavigation.hook";
import { EmptyFunction } from "@Utils/common.utils";
import { serverErrorToast } from "@Utils/toast.utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSignIn } from "react-auth-kit";

const loginApi = async (loginData: any) => {
  return await axios.post(`${BASE_URL}/auth/login`, loginData);
};

const Login = () => {
  const signIn = useSignIn();
  const { navigation } = useNavigation();
  const { mutate } = useMutation(
    (loginData, next = EmptyFunction) => {
      next();
      return loginApi(loginData);
    },
    {
      onSuccess: (response, next: any) => {
        const { access_token, refresh_token, user } = response?.data || {};

        if (
          signIn({
            token: access_token,
            expiresIn: 3,
            tokenType: "Bearer",
            authState: user,
            refreshToken: refresh_token, // Only if you are using refreshToken feature
            refreshTokenExpireIn: 60, // Only if you are using refreshToken feature
          })
        ) {
          // Only if you are using refreshToken feature
          // Redirect or do-something
          navigation({
            pathname: "/",
          });
        } else {
          //Throw error
        }
        next();
      },
      onError: ({ response }) => {
        const { errors } = response.data;
        for (let error of errors) {
          serverErrorToast(error);
        }
      },
    }
  );

  const formSchema: FormInterface = {
    fields: [
      {
        name: "email",
        label: "Email",
        type: "email",
        isRequired: true,
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        isRequired: true,
      },
    ],
    handleSubmit: (values: any, next: any = EmptyFunction) =>
      mutate(values, next),
    submitLabel: "Login",
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="h-auto w-[400px] flex flex-col rounded gap-2 py-4 shadow-lg">
        <div className="p-4 py-2 text-xl font-bold text-center border-b text-info">
          Login Here
        </div>
        <FormBuilder {...formSchema} />
        <div className="flex items-center justify-between gap-2 p-4 border-t">
          <Button
            onClick={() => {
              navigation({
                pathname: AUTH_ROUTE,
                queryParams: {
                  tabs: "register",
                },
              });
            }}
            className="btn btn-link"
          >
            Create An Account
          </Button>
          <div className="text-info ">Forgot Password</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
