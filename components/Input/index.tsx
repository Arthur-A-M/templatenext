import React, { ForwardedRef, forwardRef } from "react";

import classNames from "classnames";

import { RegisterOptions } from "react-hook-form";

interface InputComponentProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  registerOptions?: RegisterOptions;
}

const InputComponent = forwardRef<HTMLInputElement, InputComponentProps>(
  (
    { label, error, registerOptions, ...rest },
    ref: ForwardedRef<HTMLInputElement | null>
  ) => {
    return (
      <div
        className="flex w-full items-start justify-center"
        style={{
          flexDirection: "column",
        }}
      >
        {label && (
          <div
            className="flex mb-1 w-full justify-center items-start"
            style={{
              flexDirection: "column",
            }}
          >
            <div className="flex items-center justify-start gap-1">
              {rest.required && (
                <p
                  style={{
                    fontWeight: "600",
                  }}
                  className={classNames(
                    "text-primary-default text-md max-[768px]:text-xl",
                    {
                      "text-primary-default opacity-30": rest.disabled,
                    }
                  )}
                >
                  *
                </p>
              )}
              <label
                htmlFor={rest.id}
                style={{
                  fontWeight: "600",
                  letterSpacing: "-0.025em",
                }}
                className={classNames(
                  "text-md text-gray-800 max-[768px]:text-xl",
                  {
                    "text-gray-800 opacity-30": rest.disabled,
                  }
                )}
              >
                {label}
              </label>
            </div>
          </div>
        )}
        <div
          className="flex w-full justify-center items-start gap-2"
          style={{
            flexDirection: "column",
          }}
        >
          <div
            className={
              rest.className ||
              classNames(
                "transition ease-in-out flex h-full w-full bg-transparent justify-between items-center appearence-none border border-solid border-primary-default shadow-none text-gray-500 hover:border-gray-500",
                {
                  "appearence-none !bg-gray-200 transition ease-in-out focus:outline-none cursor-default !border-none opacity-70":
                    rest.disabled,
                }
              )
            }
            style={{
              borderRadius: "0.5rem",
              borderColor: error ? "red" : "#71f697",
            }}
          >
            <input
              {...rest}
              ref={ref}
              name={rest.name || ""}
              type={rest.type || "text"}
              disabled={rest.disabled || false}
              autoComplete={rest.autoComplete || "off"}
              className={classNames(
                rest.className ||
                  "w-full h-full text-gray-800 placeholder-gray-300 bg-transparent focus:outline-none border-none shadow-none focus:border-gray-gray600 max-[768px]:text-md max-[768px]:!pl-4 max-[768px]:!pt-4 max-[768px]:!pb-4 max-[768px]:!pr-2 min-[769px]:text-sm",
                {
                  "appearence-none transition !text-gray-300 !placeholder-gray-200 ease-in-out cursor-default !bg-gray-100 rounded-md !border-none":
                    rest.disabled,
                }
              )}
              style={{
                fontWeight: "500",
                padding: ".85rem .85rem .85rem 1rem",
              }}
            />
          </div>
        </div>
      </div>
    );
  }
);

InputComponent.displayName = "Input";

export default InputComponent;
