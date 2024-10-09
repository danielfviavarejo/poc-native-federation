import { loadRemoteModule } from "@angular-architects/native-federation";
import { ComponentRef, Injectable, ViewContainerRef } from "@angular/core";
import { single } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RemoteDirectiveService {
    
    private componentRef!: ComponentRef<any>;

    async createComponent(
        viewContainer: ViewContainerRef,
        remote: string,
        module: string,
        component: string
    ): Promise<ComponentRef<any>> {

        const remoteModule = await loadRemoteModule(remote, module);
        this.componentRef = viewContainer.createComponent(remoteModule[component]);

        return this.componentRef;
    }

    destroyComponent(): void {
        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = undefined!;
        }
    }
}