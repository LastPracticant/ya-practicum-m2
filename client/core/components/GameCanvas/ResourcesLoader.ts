interface ResourcesProps {
    [key: string]: HTMLImageElement | null
}

export class ResourcesLoader {
    static _resources: ResourcesProps = {};

    static _renderCanvas: Function;

    static load(urlOrArr: string | string[]) {
        if (Array.isArray(urlOrArr)) {
            urlOrArr.forEach((url) => {
                this._load(url);
            });
        } else {
            this._load(urlOrArr);
        }
    }

    static _load(url: string) {
        const img = new Image();
        img.src = url;
        this._resources[url] = null;

        img.onload = () => {
            this._resources[url] = img;

            if (this.isReady()) {
                this._renderCanvas(Object.values(this._resources));
            }
        };
    }

    static isReady() {
        let ready = true;

        Object.keys(this._resources).forEach((key) => {
            if (!this._resources[key]) ready = false;
        });

        return ready;
    }

    static onReady(func: Function) {
        this._resources = {};
        this._renderCanvas = func;
    }
}
