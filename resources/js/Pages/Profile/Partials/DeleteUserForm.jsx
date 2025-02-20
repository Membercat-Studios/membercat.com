import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-xl font-semibold text-white">
                    Delete Account
                </h2>
                <p className="mt-1 text-sm text-zinc-400">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <Button appearance="danger" onClick={confirmUserDeletion}>
                Delete Account
            </Button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6 bg-zinc-900">
                    <h2 className="text-xl font-semibold text-white">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mt-1 text-sm text-zinc-400">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </p>

                    <div className="mt-6">
                        <Input
                            id="password"
                            type="password"
                            label="Password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            error={errors.password}
                            isFocused
                            placeholder="Password"
                        />
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                        <Button appearance="text" onClick={closeModal}>
                            Cancel
                        </Button>

                        <Button
                            appearance="danger"
                            type="submit"
                            disabled={processing}
                            loading={processing}
                        >
                            Delete Account
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
