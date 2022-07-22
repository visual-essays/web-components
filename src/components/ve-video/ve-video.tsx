import { Component, Prop, State, h } from "@stencil/core";

@Component({
    tag: "ve-video",
    styleUrl: "ve-video.css",
    shadow: true
 })

export class VeVideo {

    @Prop() type: string
    @Prop() start: string = "0"
    @Prop() src: string
    @Prop() autoplay: boolean
    @Prop() muted: boolean
    @Prop() loop: boolean

    @Prop() width: string = "100"
    @Prop() height: string = "100"
    @Prop() widthUnit: string = "px"
    @Prop() heightUnit: string = "px"

    @State() GH_USER: string = "kent-map"

    // Replace with a video repo in the future
    @State() GH_REPO: string = "images"


    @State() formattedSource: string

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
                return `https://www.youtube.com/embed/${videoID}?&start=${this.start}&mute=${muted}&autoplay=${autoplay}&loop=${loop}`;
            }
            else if (this.type == "vimeo") {
                
                // Currently setting a video start time breaks muting and autoplay
                return `https://player.vimeo.com/video/${videoID}?h=d002a35f57&muted=${muted}&autoplay=${autoplay}&loop=${loop}&title=0&byline=0&portrait=0`;
                // return `https://player.vimeo.com/video/${videoID}#t=${this.start}s?h=d002a35f57&muted=${muted}&autoplay=${autoplay}&loop=${loop}&title=0&byline=0&portrait=0`;
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
                <video width = "100%" height = "100%" controls ${attributes}>
                    <source src = ${src} type = "video/${type}"/>
                </video>
            `;
        }
        // iFrame used for YouTube and Vimeo
        else {
            return `
                <iframe src = ${src} width = "100%" height = "100%" frameborder = "0" allow = "autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
            `;
        }
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
                <style innerHTML = {this.getVideoStyle()}>

                </style>
                <div id = "ve-video-container" innerHTML = {this.getVideoTag()}></div>
            </div>
        ]
    }
}