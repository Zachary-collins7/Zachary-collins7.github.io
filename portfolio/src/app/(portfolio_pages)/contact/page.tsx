"use client";
import styles from "./page.module.scss";

export default function Page() {
    return (
        <>
            <div className={styles.wrapper}>
                <h1>
                    Contact <span>Zachary</span>
                </h1>
                <h3>Lets build somthing</h3>

                <div className={styles.formBox}>
                    {/* <h2>Sedn </h2> */}

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            let emailString = "mailto:hi@the1.com".replace(
                                "1",
                                "zacharycollins"
                            );

                            const nl = "%0D%0A";
                            const formEl = e.target as HTMLFormElement;
                            const nameVal =
                                (
                                    formEl.querySelector(
                                        "#name"
                                    ) as HTMLInputElement
                                ).value.trim() || "name";
                            const emailVal =
                                (
                                    formEl.querySelector(
                                        "#email"
                                    ) as HTMLInputElement
                                ).value.trim() || "email";
                            const messageVal =
                                (
                                    formEl.querySelector(
                                        "#message"
                                    ) as HTMLInputElement
                                ).value.trim() || "message";

                            const greeting = `Hi Zach${nl}${nl}`;

                            emailString += `?subject=${
                                nameVal + " - from your Portfolio"
                            }`;
                            emailString += `&body=${greeting}${
                                messageVal + nl + nl
                            }${"from," + nl + emailVal}`;

                            window.open(emailString, "_self");
                        }}
                    >
                        <div className={styles.inputBox}>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="name"
                                required
                            />
                            <label htmlFor="name" data-error-msg="no name">
                                Name
                            </label>
                        </div>

                        <div className={styles.inputBox}>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="email"
                                required
                            />
                            <label
                                htmlFor="email"
                                data-error-msg="email is invalid"
                            >
                                email
                            </label>
                        </div>

                        <div className={styles.inputBox}>
                            <textarea
                                name="message"
                                id="message"
                                rows={3}
                                required
                                placeholder="Message"
                            />
                            <label
                                htmlFor="message"
                                data-error-msg="no message"
                            >
                                Message
                            </label>
                        </div>

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}
