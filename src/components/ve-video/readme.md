# ve-video

This component allows you to add a YouTube, Vimeo or self-hosted video to your visual essay.

## Basics

To add a video you must add the videos type (either ```youtube```, ```vimeo``` or ```self-hosted```) and it's source. For youtube and vimeo, the source is the video's URL (for example ```https://www.youtube.com/watch?v=_GZlJGERbvE``` or ```https://vimeo.com/181199735```). For self-hosted videos its the file path in the video GitHub repository (for example ```exampleFolder/example_video_3.mp4```).

The type is added as ```type = "chosen_type"``` in the ve-video tag and the source is added as ```src = "chosen_source"```.

For example:
```<ve-video type = "self-hosted" src = "example_video_3.mp4"></ve-video>```

## Property

You can also add the following properties to the tag:
<table>
    <tr>
        <th>Property</th>
        <th>Use</th>
        <th>Example</th>
    </tr>
    <tr>
        <td>width</td>
        <td>The width of the image, by defualt it is 100% of the video's container</td>
        <td>```width = "100"```</td>
    </tr>
    <tr>
        <td>height</td>
        <td>The height of the image, by defualt it is 300px</td>
        <td>```height = "20px"```</td>
    </tr>
    <tr>
        <td>sticky</td>
        <td>The property should be included if the video should stick to the top of the page while the user scrolls the section that contains the video</td>
        <td>```sticky```</td>
    </tr>
    <tr>
        <td>muted</td>
        <td>The property should be included if the video should start muted</td>
        <td>```muted```</td>
    </tr>
    <tr>
        <td>loop</td>
        <td>The property should be included if the video should play again after it has reached the end</td>
        <td>```loop```</td>
    </tr>
    <tr>
        <td>autoplay</td>
        <td>The property should be included if the video should start automatically when the page is loaded</td>
        <td>```autoplay```</td>
    </tr>
    <tr>
        <td>start</td>
        <td>The time in seconds that the video should start playing at</td>
        <td>```start = "54"```</td>
    </tr>
    <tr>
        <td>end</td>
        <td>The time in seconds that the video should stop playing</td>
        <td>```end = "132"```</td>
    </tr>
</table>

## Marks

Essays can include links to different parts of the video. A mark is in the format ```==text=={property1, property2, ...}```, with the text the user clicked on wrapped in ```==``` and the properties attached at the end inside ```{}``` as a list.

You can add the following properties to a mark:
<table>
    <tr>
        <th>Property</th>
        <th>Use</th>
        <th>Example</th>
    </tr>
    <tr>
        <td>Start time</td>
        <td>When the video should start, in seconds</td>
        <td>```==text=={30}```</td>
    </tr>
    <tr>
        <td>End time</td>
        <td>When the video should end, in seconds</td>
        <td>```==text=={start time,60}```</td>
    </tr>
        <td>Muted</td>
        <td>If the video should start muted. ```true``` for muted, ```false``` for not muted</td>
        <td>```==text=={startTime,endTime,true}``` or ==text=={startTime,endTime,false}```</td>
    </tr>
</table>

The number of properties are optional, you can include anywhere between 0 and 3 properties. Properties must be input in the order: start time, end time and muted.

Mark tags will always autoplay the video.

## Examples

```<ve-video sticky type = "self-hosted" src = "example_video_3.mp4" width = "100%" height = "300"></ve-video>```
```<ve-video sticky type = "vimeo" autoplay muted loop src = "https://vimeo.com/181199735" width = "100%" height = "300"></ve-video>```
```<ve-video sticky type = "youtube" muted loop start = "30" end = "33" src = "https://www.youtube.com/watch?v=_GZlJGERbvE" width = "100%" height = "300"></ve-video>```