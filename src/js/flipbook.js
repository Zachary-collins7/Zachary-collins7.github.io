
class FlipBook {
    constructor(el) {
        this.el = el;
        this.frames = this.el.getAttribute("data-frames");
        this.url = this.el.getAttribute("data-url");
        this.filetype = this.el.getAttribute("data-file-type") || "png";

        this.el.style.height = `${100 + this.frames * 1}vh`;

        this.canvas = document.createElement("canvas")
        this.canvas.style.position = "sticky";
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100vh";
        this.canvas.style.top = 0;
        this.canvas.style.left = 0;
        this.canvas.style.backgroundColor = "black";
        this.el.appendChild(this.canvas);

        this.context = this.canvas.getContext("2d");

        this.img = new Image();
        this.img.src = this.currentFrame(1);

        this.img.onload = function () {
            this.canvas.width = this.img.width;
            this.canvas.height = this.img.height;
            this.context.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.canvas.width, this.canvas.height);
        }.bind(this)

        window.addEventListener('scroll', () => {
            var dTop = this.el.getBoundingClientRect().top + el.ownerDocument.defaultView.pageYOffset - window.scrollY; //0 when at top, height when at bottom
            const scrollFraction = -(dTop) / this.el.getBoundingClientRect().height;
            const frameIndex = Math.max(Math.min(
                this.frames - 1,
                Math.ceil(scrollFraction * this.frames)
            ), 1);
            requestAnimationFrame(() => this.updateImage(frameIndex + 1))
        });

        this.preloadImages();
    }

    currentFrame(index) {
        var testUrl = `${this.url}${index.toString().padStart(4, '0')}.${this.filetype}`;
        return testUrl;
    }
    updateImage(index) {
        this.img.src = this.currentFrame(index);
        this.context.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.canvas.width, this.canvas.height);
    }

    async preloadImages() {
        for (let i = 1; i < this.frames; i++) {
            const img = new Image();
            img.src = this.currentFrame(i);
        }
    }
}

export { FlipBook };