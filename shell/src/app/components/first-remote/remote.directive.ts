import { Directive, Input, ViewContainerRef, ComponentRef, OnInit, OnDestroy, Output, EventEmitter, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import { RemoteDirectiveService } from './remote-directive.service';
import { RemoteOutput } from './remote-output';

@Directive({
    selector: '[remote][component][module]',
    standalone: true
})
export class RemoteDirective implements OnChanges, OnDestroy {
    @Input() remote!: string;
    @Input() component!: string;
    @Input() module!: string;
    @Input() input: Record<string, any> = {};

    @Output() output = new EventEmitter<RemoteOutput>();
    @Output() loaded = new EventEmitter<void>();
    @Output() destroyed = new EventEmitter<void>();
    @Output() error = new EventEmitter<any>();

    private componentRef!: ComponentRef<any>;

    constructor(
        private viewContainer: ViewContainerRef,
        private remoteDirectiveService: RemoteDirectiveService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['remote'] || changes['component'] || changes['module']) {
            this.loadRemoteComponent();
        }

        const input = changes['input'];
        if (input && this.componentRef) {
            this.setInputData(input);
        }
    }

    ngOnDestroy() {
        this.remoteDirectiveService.destroyComponent();
        this.destroyed.emit();
    }

    private loadRemoteComponent(): void {
        this.remoteDirectiveService.createComponent(
            this.viewContainer,
            this.remote,
            this.module,
            this.component
        )
            .then(componentRef => {
                this.loaded.emit();
                this.componentRef = componentRef;

                const change = new SimpleChange(undefined, this.input, true);
                this.setInputData(change);

                this.subscribeToOutputs();
            })
            .catch(error => this.error.emit(error));
    }

    private setInputData(change: SimpleChange): void {
        if (this.componentRef) {
            const { currentValue, previousValue, firstChange } = change;
            const _previousValue = previousValue || {};

            const changes: SimpleChanges = {};
            Object.entries(currentValue).forEach(([key, value]) => {
                changes[key] = new SimpleChange(_previousValue[key], value, firstChange);
                this.componentRef.instance[key] = value;
            });

            this.dispatchChanges(this.componentRef.instance, changes);
        }
    }

    private subscribeToOutputs(): void {
        const { instance } = this.componentRef;

        Object.keys(instance).forEach((key) => {
            const output = instance[key];

            if (output instanceof EventEmitter) {
                output.subscribe((event: any) => {
                    this.output.emit({ eventName: key, data: event });
                });
            }
        });
    }

    private dispatchChanges(instance: any, changes: SimpleChanges) {
        if (instance?.ngOnChanges) instance.ngOnChanges(changes);
    }
}
