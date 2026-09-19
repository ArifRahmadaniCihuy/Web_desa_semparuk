
/* =====================================================
   KONFIGURASI GOOGLE APPS SCRIPT
===================================================== */

const API_URL =
    "https://script.google.com/macros/s/AKfycbzUTYERDxs6xFjF4XSK32FlPaoiItPpyJRjG_DShMoYjk--iE-BnS3AhMogeWfqv-v6/exec";


/* =====================================================
   ELEMENT
===================================================== */

const formPengaduan =
    document.getElementById("formPengaduan");

const submitButton =
    document.getElementById("submitButton");


/* =====================================================
   SUBMIT PENGADUAN
===================================================== */

formPengaduan.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        submitButton.disabled = true;

        submitButton.querySelector("span").textContent =
            "Mengirim pengaduan...";


        const file =
            document.getElementById("foto").files[0];


        let foto = "";

        let mimeType = "";


        /* =============================================
           FOTO OPSIONAL
        ============================================= */

        if (file) {

            if (
                file.size >
                5 * 1024 * 1024
            ) {

                alert(
                    "Ukuran foto maksimal 5 MB."
                );

                resetButton();

                return;
            }


            foto =
                await fileToBase64(file);

            mimeType =
                file.type;

        }


        /* =============================================
           DATA
        ============================================= */

        const data = {

            action:
                "kirimPengaduan",

            nama:
                document
                    .getElementById("nama")
                    .value
                    .trim(),

            no_hp:
                document
                    .getElementById("no_hp")
                    .value
                    .trim(),

            kategori:
                document
                    .getElementById("kategori")
                    .value,

            pengaduan:
                document
                    .getElementById("pengaduan")
                    .value
                    .trim(),

            foto:
                foto,

            mimeType:
                mimeType

        };


        /* =============================================
           KIRIM KE APPS SCRIPT
        ============================================= */

        try {

            const response =
                await fetch(
                    API_URL,
                    {
                        method: "POST",
                        body: JSON.stringify(data)
                    }
                );


            const result =
                await response.json();


            if (!result.success) {

                alert(
                    result.message ||
                    "Pengaduan gagal dikirim."
                );

                resetButton();

                return;
            }


            /* =========================================
               TAMPILKAN TOKEN
            ========================================= */

            document
                .getElementById("tokenHasil")
                .textContent =
                result.token;


            formPengaduan.style.display =
                "none";


            document
                .getElementById("hasil")
                .style.display =
                "block";


            window.scrollTo({

                top:
                    document
                        .getElementById("hasil")
                        .getBoundingClientRect()
                        .top +
                    window.scrollY -
                    120,

                behavior:
                    "smooth"

            });


        } catch (error) {

            console.error(error);

            alert(
                "Pengaduan gagal dikirim. Pastikan koneksi dan URL Google Apps Script sudah benar."
            );

            resetButton();

        }

    }
);


/* =====================================================
   FILE → BASE64
===================================================== */

function fileToBase64(file) {

    return new Promise(
        function (resolve, reject) {

            const reader =
                new FileReader();


            reader.onload =
                function () {

                    const result =
                        reader.result;


                    resolve(
                        result.split(",")[1]
                    );

                };


            reader.onerror =
                reject;


            reader.readAsDataURL(file);

        }
    );

}


/* =====================================================
   SALIN TOKEN
===================================================== */

function salinToken() {

    const token =
        document
            .getElementById("tokenHasil")
            .textContent;


    navigator.clipboard
        .writeText(token)
        .then(
            function () {

                const button =
                    document.getElementById(
                        "copyTokenButton"
                    );


                button.textContent =
                    "Tersalin ✓";


                setTimeout(
                    function () {

                        button.textContent =
                            "Salin";

                    },
                    1800
                );

            }
        )
        .catch(
            function () {

                alert(
                    "Token: " + token
                );

            }
        );

}


/* =====================================================
   RESET BUTTON
===================================================== */

function resetButton() {

    submitButton.disabled =
        false;


    submitButton.querySelector("span").textContent =
        "Kirim Pengaduan";

}

