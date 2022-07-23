import { Component, Prop, Element, State, h } from "@stencil/core";
import Player from '@vimeo/player';

@Component({
    tag: "ve-video",
    styleUrl: "ve-video.css",
    shadow: true
 })

export class VeVideo {

    @Prop() type: string
    @Prop() start: string = "0"
    @Prop() end: string
    @Prop() src: string
    @Prop() autoplay: boolean
    @Prop() muted: boolean
    @Prop() loop: boolean
    @Prop() sticky: boolean

    @Prop() width: string = "100"
    @Prop() height: string = "100"
    @Prop() widthUnit: string = "px"
    @Prop() heightUnit: string = "px"

    @State() GH_USER: string = "kent-map"

    // Replace with a video repo in the future
    @State() GH_REPO: string = "images"

    @Element() el: HTMLElement;

    @State() formattedSource: string

    @State() video: HTMLVideoElement

    // Removes the 1st value and then stops
    removeFromStart(string, removeValues) {
        
        for (var i = 0; i < removeValues.length; i++) {
            if (string.startsWith(removeValues[i])) {
                return string.slice(removeValues[i].length);
            }
        }
        return string;
    }

    // Removes any other URL components to ensure src only contains videoID
    getVideoID(videoID) {
        videoID = this.removeFromStart(videoID, ["https://", "http://"]);
        videoID = this.removeFromStart(videoID, ["www."]);

        if (this.type == "youtube") {
            videoID = this.removeFromStart(videoID, ["youtube.com/", "youtube.co.uk/", "youtu.be/"]);
            videoID = this.removeFromStart(videoID, ["watch?v="]);
        }
        else if (this.type == "vimeo") {
            videoID = this.removeFromStart(videoID, ["vimeo.com/"]);
        }

        return videoID;
    }

    // Gets src in correct format, allowing users to enter it in various ways
    getFormattedSrc() {
        
        // Self-hosted assumes video always in same GitHub repo
        if (this.type == "self-hosted") {
            return `https://raw.githubusercontent.com/${this.GH_USER}/${this.GH_REPO}/main/${this.src}#t=${this.start}`;
        }
        else {
            var videoID = this.getVideoID(this.src);

            // Options not enabled by default
            var muted = 0;
            var autoplay = 0;
            var loop = 0;

            if (this.muted) {
                muted = 1;
            }
            if (this.autoplay) {
                autoplay = 1;
            }
            if (this.loop) {
                loop = 1;
            }

            if (this.type == "youtube") {
                var src = `https://www.youtube.com/embed/${videoID}?&start=${this.start}&mute=${muted}&autoplay=${autoplay}&loop=${loop}`;
                
                if (this.end != null) {
                    return `${src}&end=${this.end}`;
                }
                else {
                    return src;
                }
            }
            else if (this.type == "vimeo") {
                return `https://player.vimeo.com/video/${videoID}?h=d002a35f57&muted=${muted}&autoplay=${autoplay}&loop=${loop}&title=0&byline=0&portrait=0`;
            }
        }

        return this.src;
    }

    // Gets the tag(s) used to display the video
    getVideoTag() {
        var src = this.getFormattedSrc();

        // <video> tag used for self hosted
        if (this.type == "self-hosted") {

            var attributes = "";
            if (this.muted) {
                attributes += "muted";
            }
            if (this.autoplay) {
                attributes += " autoPlay";
            }
            if (this.loop) {
                attributes += " loop";
            }

            var splitSrc = src.split(".");
            var type = splitSrc[splitSrc.length - 1];

            var splitType = type.split("#");
            type = splitType[0];

            return `
                <video id = "ve-video-self-hosted" width = "100%" height = "100%" controls ${attributes}>
                    <source src = ${src} type = "video/${type}"/>
                </video>
            `;
        }
        // iFrame used for YouTube and Vimeo
        else {
            return `
                <iframe id = "ve-video-vimeo" src = ${src} width = "100%" height = "100%" frameborder = "0" allow = "autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
            `;
        }
    }

    // Needed for mark listeners, code taken from ve-image
    findVeVideo(el: HTMLSpanElement) {
        let sib = el.previousSibling;
        while (sib) {
            if (sib.nodeName === 'VE-VIDEO') {
                return sib === this.el ? sib : null;
            }
            sib = sib.previousSibling;
        }
        while (el.parentElement && el.tagName !== 'MAIN') {
            el = el.parentElement;
            let veVideo = el.querySelector(':scope > ve-video');
            if (veVideo) {
                return veVideo === this.el ? veVideo : null;
            }
        }
    }

    // Changes video start, end and muted properties when mark clicked
    addMarkListeners() {
        Array.from(document.querySelectorAll('mark')).forEach(mark => {

            let attributesNode = mark.attributes;
            let attributes = attributesNode.item(0).value.split(",");
            let veVideo = this.findVeVideo(mark.parentElement);

            if (veVideo) {
                mark.addEventListener("click", () => setTimeout(() => {

                    let length = attributes.length;

                    if (length > 0) {
                        this.start = attributes[0];
                    
                        if (length > 1) {
                            this.end = attributes[1];
                        }
                        
                        if (length > 2) {
                            if (attributes[2] == "true") {
                                this.muted = true;
                            }
                            else if (attributes[2] == "false") {
                                this.muted = false;
                            }
                        }

                        this.autoplay = true;

                        // Needs to be called again as start and (potentially) end times have changed
                        this.addVideoListeners();
                    }

                }, 200))
            }
        })
    }

    // setInterval used over actionListener as it does not require video to be initialized
    addSelfHostedVideoListeners() {
        if (this.end != undefined) { 

            var endTime = Number(this.end);

            // pausedOnce allows user to resume video past endTime point
            var pausedOnce = false;

            setInterval(() => {
                if (!pausedOnce) {
                    var video = this.el.shadowRoot.getElementById("ve-video-self-hosted") as HTMLVideoElement;
                    if (video.currentTime >= endTime) {
                        video.pause();
                        pausedOnce = true;
                    }            
                }
            }, 300);
        }
    }

    // Starts and ends video with JS
    addVimeoVideoListeners() {
        var iframe = this.el.shadowRoot.getElementById("ve-video-vimeo") as HTMLIFrameElement;
        var vimeoPlayer = new Player(iframe);

        vimeoPlayer.setCurrentTime(Number(this.start));

        if (this.end != undefined) {    

            var endTime = Number(this.end);
            var pausedOnce = false;

            vimeoPlayer.on("timeupdate", function(data) {
                if (!pausedOnce) {
                    if (data.seconds >= endTime) {
                        vimeoPlayer.pause();
                        pausedOnce = true;
                    }
                }
              });
        }
    }

    // YouTubes start and end time achieved in URL paramaters
    addVideoListeners() {
        
        if (this.type == "self-hosted") {
            this.addSelfHostedVideoListeners();
        }

        else if (this.type == "vimeo") {
            this.addVimeoVideoListeners();
        }
    }

    componentDidLoad() {
        this.el.classList.add("ve-component");
        if (this.sticky) {
            this.el.classList.add("sticky");
        }

        this.addMarkListeners();
        this.addVideoListeners();
    }

    // Allows height and width off component to be changed
    getVideoStyle() {
        return `
            #ve-video-container {
                width: ${this.width}${this.widthUnit};
                height: ${this.height}${this.heightUnit};
            }
        `;
    }

    render() {
        return [
            <div>
                <style innerHTML = {this.getVideoStyle()}></style>
                <div id = "ve-video-container" innerHTML = {this.getVideoTag()}></div>
            </div>
        ]
    }
}