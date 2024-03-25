import dynamic from "next/dynamic";

import React, {
  useMemo,
  useState,
  useEffect,
  InputHTMLAttributes,
} from "react";

import classNames from "classnames";

import { MdChevronLeft } from "react-icons/md";
import { HiOutlineSwitchVertical } from "react-icons/hi";

const InputComponent = dynamic(() => import("@/components/Input"), {});

export type OptionsProps = {
  key: string | number;
  value: string;
};

type SelectProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
  isOpen?: boolean;
  description?: string;
  options?: Array<OptionsProps>;
  selectedOption?: OptionsProps;
  variant?: "outlined" | "filled";
  ref?: React.Ref<HTMLInputElement>;
  selectItem?: (item: OptionsProps) => void;
};

export default function SelectComponent({
  id,
  value,
  isOpen,
  variant,
  options,
  onChange,
  selectItem,
  selectedOption,
  ...rest
}: SelectProps) {
  const [isOptionsOpen, setIsOptionsOpen] = useState(isOpen || false);

  const [optionsList, setOptionsList] = useState(options || []);

  useEffect(() => {
    setOptionsList(options || []);
  }, [options]);

  const IS_EMPTY = useMemo(() => {
    return optionsList?.length === 0;
  }, [optionsList]);

  const handleFilter = useMemo(() => {
    if (!optionsList) return [];

    return optionsList.filter((item) => {
      return item?.value?.toLowerCase();
    });
  }, [optionsList, value]);

  const isSelected = useMemo(
    () => (item: OptionsProps) => {
      return item.key === selectedOption?.key;
    },
    [selectedOption]
  );

  const handleSelect = useMemo(
    () => (item: OptionsProps) => {
      setIsOptionsOpen(false);

      if (item.key !== null) {
        selectItem?.(item);
      }
    },
    [selectItem]
  );

  const SHOW_OPTIONS = isOptionsOpen;

  return (
    <fieldset
      className="flex flex-col w-full items-start justify-center relative"
      id={id}
    >
      <div
        className={classNames(
          "flex items-center justify-start w-full shadow-none rounded-md pr-3 transition ease-in-out hover:border-gray-500",
          {
            "!border !border-solid !border-primary-default bg-transparent":
              variant === "outlined",
            "!border-[red]": !!rest.error,
          }
        )}
        style={{
          borderRadius: "0.5rem",
        }}
      >
        <InputComponent
          {...rest}
          label={""}
          type="text"
          error={false}
          value={value}
          ref={rest.ref}
          name={rest.name}
          autoComplete="off"
          onChange={onChange}
          onClick={() => setIsOptionsOpen(true)}
          placeholder={IS_EMPTY ? "Nenhuma opção disponível" : rest.placeholder}
          className={classNames(
            "appearence-none focus:outline-none w-full rounded-md placeholder-gray-300 border-none shadow-none text-gray-800 hover:border-gray-500 !font-medium !placeholder-bold max-[768px]:text-md min-[769px]:text-sm",
            {
              "bg-transparent": variant === "outlined",
            }
          )}
        />
        <MdChevronLeft
          size={15}
          aria-hidden="true"
          className={classNames(
            "text-gray-300 cursor-pointer flex items-center justify-center w-7 h-7 transition-all duration-200 ease-in-out"
          )}
          onClick={() => setIsOptionsOpen(!isOptionsOpen)}
          style={{ transform: `rotate(${isOptionsOpen ? 90 : -90}deg)` }}
        />
      </div>
      {rest.error && (
        <p className="invalid-feedback text-primary-default text-sm font-semibold mt-2">
          {rest.error}
        </p>
      )}
      {SHOW_OPTIONS && (
        <div
          className={classNames(
            "flex w-full items-start justify-start flex-col rounded-md bg-white-default max-h-[308px] overflow-y-auto scrollbar focus:outline-none absolute z-20 transition-all duration-200 ease-in-out"
          )}
          style={{
            boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          {handleFilter?.map((item) => (
            <div
              key={item.key}
              onClick={() => handleSelect(item)}
              className={classNames(
                "text-gray-500 flex w-full items-start justify-between bg-white-default shadow-none px-5 py-3 cursor-pointer hover:text-gray-500 text-sm hover:bg-gray-100 transition-all duration-200 ease-in-out hover:font-bold",
                {
                  "!bg-[#ffff] text-gray-500 !font-bold": isSelected(item),
                }
              )}
              style={{
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  display: "inline-block",
                  textOverflow: "ellipsis",
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </fieldset>
  );
}
