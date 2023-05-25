import Button from "@Components/Button/button.component";
import { FormInterface } from "@Composites/FormBuilder/Types/form.types";
import FormBuilder from "@Composites/FormBuilder/formBuilder";
import { AUTH_ROUTE } from "@Constants/route.constant";
import useNavigation from "@Hooks/useNavigation.hook";
import { EmptyFunction } from "@Utils/common.utils";
import { sendRequest } from "@Utils/service.utils";
import { useSignIn } from "react-auth-kit";

const Login = () => {
  const signIn = useSignIn();
  const { navigation } = useNavigation();

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
    handleSubmit: async (values: any, next: any = EmptyFunction) => {
      const { success, response } = await sendRequest({
        end_point: "auth/login",
        method: "post",
        classParams: {
          ...values,
        },
      });
      if (success) {
        const { access_token, refresh_token, user } = response || {};

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
        }
      }
      next();
    },

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
