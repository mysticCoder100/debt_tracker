"use client";

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {clsx} from "clsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React, {useEffect, useState} from "react";

export type inputProps = {
    name: string;
    type?: string;
    status?: string;
    errorMessage?: string | boolean;
    prevContent?: string;
    label: string;
    noLabel?: boolean;
    onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type selectProps = inputProps & {
    options: {
        [key: string | number]: string;
    }
};


export function FormInput({name, type, label, status, errorMessage, prevContent, noLabel, onInput}: inputProps) {
    return (
        <div>
            {
                noLabel || <Label htmlFor={name}>{label}</Label>
            }
            <Input
                id={name}
                name={name}
                type={type}
                placeholder={label}
                className={clsx("mt-2", {
                    "ring-2 ring-red-400 ring-offset-2": status === "failed" && errorMessage,
                })}
                defaultValue={prevContent}
                onInput={onInput}
            />
            {
                status === "failed" && (
                    <small className="text-red-500"> {errorMessage != undefined && errorMessage} </small>
                )
            }
        </div>
    );
}


export function FormSelect({name, label, status, errorMessage, options, prevContent}: selectProps) {

    console.log("prevContent  ", prevContent)

    const [value, setValue] = useState<string | undefined>();
    console.log("value ", value)

    useEffect(() => {
        setValue(value);
    }, [value, prevContent]);

    return (

        <div>
            <Label htmlFor={name}>{label}</Label>
            <Select name={name} value={value} onValueChange={setValue}>
                <SelectTrigger className={clsx("mt-2", {
                    "ring-2 ring-red-400 ring-offset-2": status === "failed" && errorMessage,
                })} id={name}>
                    <SelectValue placeholder={label}/>
                </SelectTrigger>
                <SelectContent>
                    {
                        Object.entries(options).map(([key, value]) => (
                            <SelectItem key={key} value={key.toString()}>
                                {value}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
            {
                status === "failed" && (
                    <small className="text-red-500"> {errorMessage} </small>
                )
            }
        </div>
    )
}


export function FormSelectX({name, label, status, errorMessage, options}: selectProps) {

    return (
        <div className={"grid"}>
            <Label htmlFor={name}>{label}</Label>
            <select name={name}
                    className={clsx("flex mt-2 mb-1 h-10 w-full items-center justify-between rounded-md" +
                        " border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus:ring-neutral-300", {
                        "ring-2 ring-red-400 ring-offset-2": status === "failed" && errorMessage,
                    })}
            >
                <option value="">{label}</option>
                {
                    Object.entries(options).map(([key, value]) => (
                        <option key={key} value={key.toString()}>
                            {value}
                        </option>
                    ))
                }
            </select>
            {
                status === "failed" && (
                    <small className="text-red-500"> {errorMessage} </small>
                )
            }
        </div>
    );
}
