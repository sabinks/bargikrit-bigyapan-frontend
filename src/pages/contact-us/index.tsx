"use client";
import { useState, FormEvent, useRef, Fragment } from "react";
import { Inter } from 'next/font/google'
import { toast } from "react-toastify";
import Head from "next/head";
import { Dialog, Transition } from '@headlessui/react'
import Image from "next/image";
import { sendContact } from "../../../api";
import { playFair } from "@/fonts";
import Input from "../../../component/Input";
import Button from "../../../component/Button";
const inter = Inter({ subsets: ['latin'] })

interface ContactType {
    name: string;
    email: string;
    phone: string | number;
    subject: string;
    message: string;
}

const Contact = () => {
    const [state, setState] = useState({
        message: ''
    })
    const [open, setOpen] = useState(true)

    const cancelButtonRef = useRef(null)
    const [form, setForm] = useState<ContactType>({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>();

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const response = await sendContact(form);
            setState((prev: any) => ({
                ...prev, message: response.data
            }))
            setForm({ name: "", email: "", phone: "", subject: "", message: "" });
            setLoading(false)
        } catch (error: any) {
            const { data } = error.response;
            setErrors(data);
            setLoading(false);
        }
    };
    return (
        <div className="">
            <div className="container mx-auto mt-8 mb-36">
                <div className="flex flex-col items-center justify-center md:justify-normal ">
                    <div className="mt-8 mb-8 flex flex-col  px-4 md:px-0">
                        <h2 id="slide-left" className={`${playFair.className} text-5xl md:text-7xl font-extrabold mb-6 text-center`}>Contact Us</h2>
                        <form onSubmit={handleSubmit} className=" flex flex-col space-y-4">
                            <Input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Name*"
                                // label="Your Name"
                                className=" w-96"
                                error={errors && errors?.name}
                            />
                            <Input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email*"
                                // label="Email"
                                className="w-96"
                                error={errors && errors?.email}
                            />
                            <Input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Contact No.*"
                                // label="Phone"
                                className="w-96"
                                error={errors && errors?.phone}
                            />
                            <Input
                                type="text"
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                placeholder="Subject*"
                                // label="Subject"
                                className="w-96"
                                error={errors && errors?.subject}
                            />

                            <Input
                                type="textarea"
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Message*"
                                // label="Subject"
                                className="w-96"
                                error={errors && errors?.message}
                            />
                            <Button
                                label="Submit"
                                // buttonType="submit"
                                loading={loading}
                                type="submit"
                                className="my-6 py-2 bg-primary hover:text-white rounded-md w-96"
                            />
                        </form>
                        {
                            state?.message &&
                            <Transition.Root show={open} as={Fragment}>
                                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                    </Transition.Child>

                                    <div className="fixed inset-0 z-10 overflow-y-auto">
                                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                            <Transition.Child
                                                as={Fragment}
                                                enter="ease-out duration-300"
                                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                                leave="ease-in duration-200"
                                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                            >
                                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                        <div className="sm:flex sm:items-start">
                                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                                                <Image src="/assets/bb-250.png" width={80} height={80} alt="Logo" />
                                                            </div>
                                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                                {/* <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                                    Deactivate account
                                                                </Dialog.Title> */}
                                                                <div className="mt-2">
                                                                    <p className=" text-base text-gray-dark">
                                                                        {
                                                                            state?.message
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                        <button
                                                            type="button"
                                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                            onClick={() => {
                                                                setOpen(false)
                                                            }}
                                                        >
                                                            Close
                                                        </button>
                                                    </div>
                                                </Dialog.Panel>
                                            </Transition.Child>
                                        </div>
                                    </div>
                                </Dialog>
                            </Transition.Root>
                        }
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Contact;
