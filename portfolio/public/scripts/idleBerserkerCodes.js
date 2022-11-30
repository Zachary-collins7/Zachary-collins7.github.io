let coupons = [];

const objToCss = (obj) => Object.entries(obj).map(([k, v]) => `${k}: ${v}`).join(";");

const loadCodes = async () => {
    const res = await fetch("https://zachary-collins7.github.io/data/idleBerserkerCodes.json")
    const data = await res.json()
    coupons = data.codes
}

const createUi = async () => {
    document.querySelectorAll("body *").forEach(e => e.remove());
    document.body.style = objToCss({
        "display": "flex",
        "flex-direction": "column",
        "align-items": "center",
        "justify-content": "center",
        "min-height": "100vh",
        "height": "unset",
        "width": "100vw",
        "margin": "0",
        // "padding": "1rem"
    });

    var form = document.body.appendChild(document.createElement("div"));
    form.style = objToCss({
        "display": "flex",
        "flex-direction": "column",
        "gap": "1rem",
        "width": "min(400px, 100%)",
        "background": "rgba(50, 50, 50, 0.5)",
        "padding": "1rem",
        "border-radius": "1rem",
        "box-shadow": "0 0 1rem 0.5rem rgba(95, 0, 0, 0.75)"
    });

    form.appendChild(document.createElement("img")).src = "../berserker_web/image/web_title_En.png";

    form.appendChild((() => {
        const divider = document.createElement("div")
        divider.style = objToCss({
            "display": "flex",
            "flex-direction": "row",
            "justify-content": "center",
            "align-items": "center",
            "width": "100%",
            "margin": "0 0 1rem 0",
        });

        divider.appendChild(document.createElement("hr")).style = objToCss({
            "flex-grow": "1",
            "border": "1px solid rgba(255, 255, 255, 0.5)"
        });

        divider.appendChild((() => {
            const span = document.createElement("span");
            span.innerText = "Made by ";

            span.style = objToCss({
                "margin": "0 1rem",
                "color": "rgba(255, 255, 255, 0.5)"
            });
            span.appendChild((() => {
                const span = document.createElement("span");
                span.innerText = "RedSnowX";
                span.style.color = "whitesmoke";
                return span;
            })());
            return span;
        })())

        divider.appendChild(document.createElement("hr")).style = objToCss({
            "flex-grow": "1",
            "border": "1px solid rgba(255, 255, 255, 0.5)"
        });
        return divider;
    })());

    form.appendChild((() => {
        const nickname_el = document.createElement("input");
        nickname_el.id = "_nickname";
        nickname_el.placeholder = "Enter your nickname";
        nickname_el.style = objToCss({
            "padding": "0.5rem",
            "border-radius": "0.5rem",
            "border": "none",
        });
        return nickname_el;
    })());

    form.appendChild(document.createElement("button")).style = objToCss({
        "background": "url('../berserker_web/image/web_btn_submit_En.png')",
        "background-size": "100% 100%",
        "border": "none",
        "padding": "30px",
        "width": "70%",
        "margin": "0.5rem auto 0",
    });

    const table = (() => {
        const tablebg = form.appendChild(document.createElement("div"));
        tablebg.style = objToCss({
            "background": "rgba(0, 0, 0, 0.5)",
            "border-radius": "0.5rem",
            "padding": "0.5rem",
            "width": "100%",
        })
        const table = tablebg.appendChild(document.createElement("table"))
        table.style = objToCss({
            "width": "100%",
            "color": "whitesmoke",
            "border-collapse": "collapse",
            "overflow": "hidden",
        })
        return table;
    })()

    table.appendChild((() => {
        const thead = document.createElement("thead");
        thead.style = objToCss({
            "border-bottom": "1px solid grey",
        });

        thead.appendChild(document.createElement("td")).innerText = "Coupon Codes";
        thead.appendChild(document.createElement("td")).innerText = "Status";

        return thead
    })());

    coupons.forEach(coupon => {
        const tr = table.appendChild(document.createElement("tr"));
        tr.id = "_coupon_" + coupon;

        tr.appendChild((() => {
            const couponName = document.createElement("td");
            couponName.innerText = coupon;
            couponName.style = objToCss({ "padding": "0.15rem 0.3rem" });
            return couponName;
        })());

        tr.appendChild((() => {
            couponStatus = document.createElement("td")
            couponStatus.innerText = "---";
            couponStatus.style = objToCss({ "padding": "0.15rem 0.3rem" });
            return couponStatus;
        })());
    });

    table.appendChild((() => {
        const tfoot = document.createElement("tfoot");
        const td = tfoot.appendChild(document.createElement("td"));
        td.colSpan = "2";
        td.style.padding = "0.5rem 0";
        td.style.width = "100%";

        // add a button that copies the table to clipboard
        td.appendChild((() => {
            const button = document.createElement("button");
            button.innerText = "Copy table to clipboard";
            button.style = objToCss({
                "border": "none",
                "border-radius": "0.5rem",
                "padding": "0.5rem",
                "width": "100%",
                "border": "1px solid rgba(95, 0, 0, 0.75)",
                "color": "rgba(150, 0, 0, 1)",
                "background": "rgba(95, 0, 0, 0.25)",
            });
            button.addEventListener("click", () => {
                const table = document.querySelector("table");
                const tableHeader = table.querySelector("thead").innerText;
                const tableText = Array.from(table.querySelectorAll("tr")).map(tr => tr.innerText).join("\n");
                navigator.clipboard.writeText(
                    `${tableHeader}\n${tableText}`
                );
            });
            return button;
        })());
        return tfoot;
    })());

    form.appendChild((() => {
        const link = document.createElement("a");
        link.href = "https://zachary-collins7.github.io";
        link.innerText = "Check out my other projects!";
        link.style.color = "hsl(227.56, 51.97%, 62.53%)";
        return link;
    })())
}

const addButtonEventListeners = async () => {
    document.querySelector("button").addEventListener("click", async () => {
        const nickname = document.querySelector("#_nickname").value;

        if (nickname.length < 1) {
            alert("Please enter your nickname");
            return;
        }
        const resCodeKey = {
            200: "Claimed",
            10001: "Invalid Nickname",
            60000: "Invalid Coupon",
            60001: "Expired Coupon",
            60003: "Already Claimed"
        }
        const sucessCodes = [200];
        const messageCodes = [60003];
        const errorCodes = [10001, 60000, 60001];

        const updateTable = ({ coupon, res }) => {
            const td = document.querySelector("#_coupon_" + coupon + " td:last-child")
            td.innerText = resCodeKey[res.code] || res.code;
            if (sucessCodes.includes(res.code)) return td.style.color = "green";
            if (messageCodes.includes(res.code)) return td.style.color = "grey";
            if (res.code === 10001) return td.style.color = "red";


            // if we can check the date
            if (!isNaN(coupon.slice(-4))) {
                const dateAvailable = coupon.slice(-4);

                // create new date object with the date available assuming it's in the format MMDD
                // assume date is in the future
                const activeDate = new Date();
                activeDate.setUTCMonth(dateAvailable.slice(0, 2) - 1);
                activeDate.setUTCDate(dateAvailable.slice(2, 4));
                activeDate.setUTCHours(1, 0, 0, 0); // Not sure why they start it at 10am kst but whatever

                const currentDate = new Date();

                // if the month is less than the current assume it's next year
                if (activeDate.getUTCMonth() < currentDate.getUTCMonth()) {
                    activeDate.setUTCFullYear(currentDate.getUTCFullYear() + 1);
                }

                //TODO only update if res.code is a number

                const niceDate = (() => {
                    const rtf1 = new Intl.RelativeTimeFormat('en', { style: 'narrow' });

                    const diff = activeDate - currentDate;

                    const months = Math.floor(diff / 1000 / 60 / 60 / 24 / 30);
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor(diff / (1000 * 60 * 60));
                    const minutes = Math.floor(diff / (1000 * 60));


                    if (months > 0) return rtf1.format(months, 'month');
                    if (days > 0) return rtf1.format(days, 'day');
                    if (hours > 0) return rtf1.format(hours, 'hour');
                    if (minutes > 0) return rtf1.format(minutes, 'minute');
                    return "now";
                })()
                
                // if we hit the api already (and it's not a sucess code)
                if (!isNaN(res.code)) {
                    td.innerText += ` (${resCodeKey[res.code] || res.code})`;
                    td.innerText = `Available ${niceDate}`;
                    td.style.color = "orange";
                }
            }
            // default to red
            if (errorCodes.includes(res.code)) td.style.color = "red";
        }

        await Promise.allSettled(coupons.map(coupon => ({ nickname, coupon })).map(async ({ nickname, coupon }, i) => {
            updateTable({ coupon, res: { code: "Checking..." } });
            await new Promise(r => setTimeout(r, i * 1000 + 1000));
            const res = await fetch("../berserker_web/coupon/reward", {
                body: new URLSearchParams({ nickname, coupon }),
                method: "POST",
            }).then(res => res.json())
            updateTable({ coupon, res })
        }))
    });
}

(async () => {
    await loadCodes();
    await createUi();
    await addButtonEventListeners();
})();