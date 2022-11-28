let spin = document.querySelector('#spin');
let rouletteElem = document.querySelector('#spinner');
const offer = document.getElementById("offer");
let scoreElem = document.getElementById("reward");
let coupon = document.getElementById("coupon");
var wheel_audio = new Audio('./assets/sound/spinner-audio.mp3');
var copyText = document.getElementById("copyButton");
var winner = document.getElementById("win");



var force = 0;
var angle = 0;
var rota = 1;
var inertia = 0.985;
var minForce = 15;
var randForce = 15;

// value array
var values = [
    {
        name: "Flat $500 off",
        price: "BCX028S"
    },
    {
        name: "EDT Noir $999",
        price: "XR5SF1"
    },
    {
        name: "$5000 Vaoucher",
        price: "DE20S52"
    },
    {
        name: "Flat 20% off",
        price: "02C5SDF"
    },
    {
        name: "Balance 50ml 499",
        price: "D0X5FD5"
    },
    {
        name: "Free Gift Box",
        price: "MMO5D0D5"
    },
].reverse();;


// on click spin and genereate random value
spin.addEventListener("click", () => {

    // set initial force randomly
    force = Math.floor(Math.random() * randForce) + minForce;
    requestAnimationFrame(doAnimation);
})

//  rotation of wheel
function doAnimation() {
    wheel_audio.play();
    // new angle is previous angle + force modulo 360 (so that it stays between 0 and 360)
    angle = (angle + force) % 360;
    // decay force according to inertia parameter
    force *= inertia;
    rouletteElem.style.transform = 'rotate(' + angle + 'deg)';
    // stop animation if force is too low
    if (force < 0.05) {
        scoreElem.disabled = false;
        obatinedAngle()
        // score roughly estimated
        // scoreElem.innerHTML = values[Math.floor(((angle / 360) * values.length) - 0.5)];
        wheel_audio.pause();
        return;
    }
    requestAnimationFrame(doAnimation);
}


scoreElem.disabled = true;
scoreElem.addEventListener("click", () => {
    let details = values[Math.floor(((angle / 360) * values.length) - 0.5)];
    let name = details.name;
    let price = details.price;
    offer.innerText = name;
    coupon.placeholder = price;
    winner.innerText = "Congrats! You won:";
    document.getElementById('discount').innerText = "Continue & Use Discount"
    document.getElementById('Expires').innerText = "*Expires in 2 Hours <br>* Not valid on combos";
    copyText.disabled = false

})


// copy coupon by clicking
copyText.addEventListener(('click'), () => {
    coupon.select();
    coupon.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(coupon.placeholder);
    alert("copied the coupon:-" + coupon.placeholder)
})

//  obtaining offer by angle obtained
function obatinedAngle() {
    obtaingAngle = Math.floor(angle);
    console.log(Math.floor(angle) + " obtained")
    if (obtaingAngle >= 0 && obtaingAngle <= 60) {
        console.log("free gift box")
    }
    else if (obtaingAngle > 60 && obtaingAngle <= 120) {
        console.log("flat 500")
    }
    else if (obtaingAngle > 120 && obtaingAngle <= 180) {
        console.log("balance 50ml 499")
    }
    else if (obtaingAngle > 180 && obtaingAngle <= 240) {
        console.log(" Flat 20% off")
    }
    else if (obtaingAngle > 240 && obtaingAngle <= 300) {
        console.log(" EDT not 999")
    }
    else if (obtaingAngle > 300 && obtaingAngle <= 360) {
        console.log(" 5000 voucher")
    }


}






