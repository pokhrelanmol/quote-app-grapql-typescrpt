import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/User";
import { SIGNIN_USER } from "../../graphql/mutations.graphql";
import {
    MutationSignInUserArgs,
    SignInUserMutation,
} from "../../types/graphql";
interface IForm {
    email: string;
    password: string;
}
const Login = () => {
    const { setUser } = useUser();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<IForm>({} as IForm);
    const [signin, { data, loading, error }] =
        useMutation<SignInUserMutation>(SIGNIN_USER);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        // setUser({
        //     name: formData.firstname,
        //     email: formData.email,
        // });
        signin({
            variables: {
                user: formData,
            },
        });
    };
    if (data) {
        //    we are getting access token here
        localStorage.setItem("token", data.user.accessToken as string);
        console.log(data);

        // setUser({ name: data.name, email: data.email });
        navigate("/");
    }
    if (loading) return <h1>Loading...</h1>;

    return (
        <section className="h-screen">
            {error && (
                <h1 className="text-red-700 shadow-md m-4 text-white">
                    {error.message}
                </h1>
            )}
            <div className="px-6 h-full text-gray-800">
                <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                    <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="w-full"
                            alt="Sample"
                        />
                    </div>
                    <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                        <form onSubmit={handleSubmit}>
                            <h1 className="text-3xl mb-2">Login </h1>

                            <div className="mb-6">
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="exampleFormControlInput2"
                                    placeholder="Email address"
                                    name="email"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="password"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="exampleFormControlInput2"
                                    placeholder="Password"
                                    name="password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <div className="form-group form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                        id="exampleCheck2"
                                    />
                                    <label
                                        className="form-check-label inline-block text-gray-800"
                                        htmlFor="exampleCheck2"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <p className="text-gray-800">
                                    Forgot password?
                                </p>
                            </div>
                            <div className="text-center lg:text-left">
                                <button
                                    type="submit"
                                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                    Login
                                </button>
                                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                    Don't have an account?
                                    <p
                                        className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                                        onClick={() => navigate("/register")}
                                    >
                                        Register
                                    </p>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Login;
