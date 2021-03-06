/// <reference path="../../typings/browser.d.ts" />

import * as rx from "rx";

import {Node} from "../Graph";
import {
    FrameGenerator,
    IStateContext,
    IFrame,
    IRotation,
    StateContext,
} from "../State";

export class StateService {
    private _appendNode$: rx.Subject<Node> = new rx.Subject<Node>();
    private _currentState$: rx.Subject<IFrame>;
    private _currentNode$: rx.Observable<Node>;

    private _context: IStateContext;

    private _frameGenerator: FrameGenerator;
    private _frameId: number;

    constructor () {
        this._context = new StateContext();
        this._currentState$ = new rx.BehaviorSubject<IFrame>({ id: 0, state: this._context });

        this._currentNode$ = this._currentState$
            .map<Node>((f: IFrame): Node => { return f.state.currentNode; })
            .filter((n: Node): boolean => { return n != null; })
            .distinctUntilChanged()
            .shareReplay(1);
        this._currentNode$.subscribe();

        this._frameGenerator = new FrameGenerator();
        this._frameId = null;

        // fixme we should probably implement all functions in a more reactive way
        this._appendNode$.subscribe((node: Node) => {
            this.appendNodes([node]);
        });
    }

    public get currentState$(): rx.Observable<IFrame> {
        return this._currentState$;
    }

    public get currentNode$(): rx.Observable<Node> {
        return this._currentNode$;
    }

    public dispose(): void {
        this.stop();
    }

    public start(): void {
        if (this._frameId == null) {
            this._frameId = this._frameGenerator.requestAnimationFrame(this.frame.bind(this));
        }
    }

    public stop(): void {
        if (this._frameId != null) {
            this._frameGenerator.cancelAnimationFrame(this._frameId);
            this._frameId = null;
        }
    }

    public appendNodes(nodes: Node[]): void {
        this._context.append(nodes);
    }

    public removeNodes(n: number): void {
        this._context.remove(n);
    }

    public cutNodes(): void {
        this._context.cut();
    }

    public setNodes(nodes: Node[]): void {
        this._context.set(nodes);
    }

    public rotate(delta: IRotation): void {
        this._context.rotate(delta);
    }

    public get appendNode$(): rx.Subject<Node> {
        return this._appendNode$;
    }

    private frame(time: number): void {
        this._frameId = this._frameGenerator.requestAnimationFrame(this.frame.bind(this));

        this._context.update();

        this._currentState$.onNext({ id: this._frameId, state: this._context });
    }
}
