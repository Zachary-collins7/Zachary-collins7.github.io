var preLoad = (() => {
    const objToCss = (obj) => Object.entries(obj).map(([k, v]) => `${k}: ${v}`).join(";");

    document.querySelectorAll("body *").forEach(e => e.remove());
    document.body.style = objToCss({
        "display": "flex",
        "border": "1px solid green",
        "flex-direction": "column",
        "align-items": "center",
        "justify-content": "center",
        "height": "100vh",
        "width": "100vw",
        "margin": "0",
        "padding": "0"
    });

    var form = document.body.appendChild(document.createElement("div"));
    form.style = objToCss({
        "display": "flex",
        "flex-direction": "column",
        "gap": "1rem",
        "width": "min(400px, 95%)",
        "background": "rgba(50, 50, 50, 0.5)",
        "padding": "1rem",
        "border-radius": "1rem",
        "box-shadow": "0 0 1rem 0.5rem rgba(95, 0, 0, 0.75)"
    });

    form.appendChild(document.createElement("img")).src = "../berserker_web/image/web_title_En.png";

    form.appendChild(document.createElement("div")).style = objToCss({
        "width": "100%",
        "height": "1px",
        "background": "rgba(255, 255, 255, 0.5)",
        "margin": "0 0 1rem 0",
    });

    const nickname_el = form.appendChild(document.createElement("input"));
    nickname_el.id = "_nickname";
    nickname_el.placeholder = "Enter your nickname";
    nickname_el.style = objToCss({
        "padding": "0.5rem",
        "border-radius": "0.5rem",
        "border": "none",
    });

    form.appendChild(document.createElement("button")).style = objToCss({
        "background": "url('../berserker_web/image/web_btn_submit_En.png')",
        "background-size": "100% 100%",
        "border": "none",
        "padding": "30px",
        "width": "70%",
        "margin": "0.5rem auto 0",
    });

    const table = form.appendChild(document.createElement("table"))
    table.style = objToCss({
        "width": "100%",
        "margin": "1rem 0 0 0",
        "color": "whitesmoke",
        "border-collapse": "collapse",
        "border": "1px solid rgba(255, 255, 255, 0.5)",
        "border-radius": "0.5rem",
        "overflow": "hidden",
        "background": "rgba(0, 0, 0, 0.5)",
    })

    table.appendChild(document.createElement("thead")).style = objToCss({
        "background": "rgba(0, 0, 0, 0.5)",
    });

    coupons.forEach(coupon => {
        const tr = table.appendChild(document.createElement("tr"));
        tr.id = "_coupon_" + coupon;
        tr.appendChild(document.createElement("td")).innerText = coupon;
        tr.appendChild(document.createElement("td")).innerText = "...";
    });
})();

document.querySelector("button").addEventListener("click", () => {
    const nickname = document.querySelector("#_nickname").value;
    if (nickname.length < 1) {
        alert("Please enter your nickname");
        return;
    }
    var resCodeKey = {
        200: "Claimed",
        10001: "Invalid Nickname",
        60000: "Invalid Coupon",
        60001: "Expired Coupon",
        60003: "Already Claimed"
    }
    var sucessCodes = [200];
    var messageCodes = [60003];
    var errorCodes = [10001, 60000, 60001];

    var res_a = Promise.allSettled(coupons.map(coupon => ({ nickname, coupon })).map(async ({ nickname, coupon }, i) => {
        await new Promise(r => setTimeout(r, i * 1000));
        const res = await fetch("../berserker_web/coupon/reward", {
            body: new URLSearchParams({ nickname, coupon }),
            method: "POST",
        }).then(res => res.json())
        return { coupon, res }
    }))
        .then(res => res.map(({ value }) => value))
        .then(res => res.forEach(({ coupon, res }) => {
            const td = document.querySelector("#_coupon_" + coupon + " td:last-child")
            td.innerText = resCodeKey[res.code] || res.code;
            if (sucessCodes.includes(res.code)) td.style.color = "green";
            if (errorCodes.includes(res.code)) td.style.color = "red";
            if (messageCodes.includes(res.code)) td.style.color = "grey";
        }))
});