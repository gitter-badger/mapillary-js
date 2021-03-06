import {ImageSize} from "../../Viewer";

export interface IViewerOptions {
    /**
     * Show attribution
     * @default true
     */
    attribution?: boolean;

    /**
     * Display a background if no key is set.
     * @default true
     */
    background?: boolean;

    /**
     * Cache images ahead.
     * @default true
     */
    cache?: boolean;

    /**
     * Use a cover and avoid loading initial data from Mapillary.
     * @default true
     */
    cover?: boolean;

    /**
     * Show debug interface.
     * @default false
     */
    debug?: boolean;

    /**
     * Show direction arrows for navigation.
     * @default true
     */
    direction?: boolean;

    /**
     * Show static navigation arrows in the corners.
     * @default false
     */
    navigation?: boolean;

    /**
     * Show sequence navigation arrows.
     * @default true
     */
    sequence?: boolean;

    /**
     * Show static images without transitions.
     * @default true
     */
    image?: boolean;

    /**
     * Show image planes in 3D using WebGL.
     * @default true
     */
    imageplane?: boolean;

    /**
     * Enable use of keyboard commands.
     * @default true
     */
    keyboard?: boolean;

    /**
     * Show indication of loading.
     * @default true
     */
    loading?: boolean;

    /**
     * Enable an interface for showing markers in the viewer
     * @default true
     */
    marker?: boolean;

    /**
     * Enable mouse interface (needed for panorama navigation)
     * @default true
     */
    mouse?: boolean;

    /**
     * Add play ability to the viewer.
     * @default false
     */
    player?: boolean;

    /**
     * Create a route with a story inside mapillary js
     * @default false
     */
    route?: boolean;

    /**
     * Default size of the thumbnail used in the viewer
     * @default {ImageSize}
     */
    baseImageSize?: ImageSize;

    /**
     * The max size of an image shown in the viewer
     * will be used when user pauses.
     * @default {ImageSize}
     */
    maxImageSize?: ImageSize;
}

export default IViewerOptions;
