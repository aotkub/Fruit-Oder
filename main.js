const fields = [
    { selectId: "small", otherId: "small-other", hiddenId: "small-hidden" },
    { selectId: "mid", otherId: "mid-other", hiddenId: "mid-hidden" },
    { selectId: "big", otherId: "big-other", hiddenId: "big-hidden" },
    { selectId: "durio-Zibethinus", otherId: "durio-Zibethinus-other", hiddenId: "durio-Zibethinus-hidden" },
    { selectId: "cha-nee", otherId: "cha-nee-other", hiddenId: "cha-nee-hidden" },
    { selectId: "rambutan", otherId: "rambutan-other", hiddenId: "rambutan-hidden" },
    { selectId: "mangosteen", otherId: "mangosteen-other", hiddenId: "mangosteen-hidden" }
];

fields.forEach(({ selectId, otherId, hiddenId }) => {
    const select = document.getElementById(selectId);
    const other = document.getElementById(otherId);
    const hidden = document.getElementById(hiddenId);

    select.addEventListener("change", function () {
        if (this.value === "__other_option__") {
            other.style.display = "block";
            other.required = true;
        } else {
            other.style.display = "none";
            other.required = false;
            hidden.value = "";
        }
    });

    other.addEventListener("input", function () {
        hidden.value = this.value;
    });
});

document.getElementById("fruitForm").addEventListener("submit", function (e) {
    e.preventDefault(); // ป้องกันการส่งฟอร์มทันที

    Swal.fire({
        title: "ยืนยันการส่งออเดอร์?",
        text: "คุณแน่ใจหรือไม่ว่าต้องการส่งออเดอร์นี้",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "ใช่, ส่งเลย!",
        cancelButtonText: "ยกเลิก",

    }).then((result) => {
        if (result.isConfirmed) {
            const form = e.target;
            const data = new FormData(form);

            fetch("https://docs.google.com/forms/d/e/1FAIpQLSdILqI3wX2X13x-BrNqUeHmEqExBPoeg_Yd6vpFmSJdDR9Y-g/formResponse", {
                method: "POST",
                mode: "no-cors",
                body: data
            });

            form.reset();
            fields.forEach(({ otherId }) => {
                document.getElementById(otherId).style.display = "none";
            });

            Swal.fire({
                title: "ส่งออเดอร์สำเร็จ!",
                text: "ขอบคุณที่สั่งผลไม้ค่ะ/ครับ 🍉🍍🍓",
                icon: "success",
                confirmButtonText: "ตกลง"
            });
        }
    });
});