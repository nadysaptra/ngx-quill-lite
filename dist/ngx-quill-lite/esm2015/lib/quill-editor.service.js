import { Injectable, Inject } from '@angular/core';
import { ReplaySubject, forkJoin } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class QuillEditorService {
    constructor(document) {
        this.document = document;
        this._loadedLibraries = {};
    }
    lazyLoadQuill() {
        return forkJoin([
            this.loadScript('assets/quill/quill.min.js'),
            this.loadStyle('assets/quill/quill.snow.css')
        ]);
    }
    loadScript(url) {
        if (this._loadedLibraries[url]) {
            return this._loadedLibraries[url].asObservable();
        }
        this._loadedLibraries[url] = new ReplaySubject();
        const script = this.document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = url;
        script.onload = () => {
            this._loadedLibraries[url].next();
            this._loadedLibraries[url].complete();
        };
        this.document.body.appendChild(script);
        return this._loadedLibraries[url].asObservable();
    }
    loadStyle(url) {
        if (this._loadedLibraries[url]) {
            return this._loadedLibraries[url].asObservable();
        }
        this._loadedLibraries[url] = new ReplaySubject();
        const style = this.document.createElement('link');
        style.type = 'text/css';
        style.href = url;
        style.rel = 'stylesheet';
        style.onload = () => {
            this._loadedLibraries[url].next();
            this._loadedLibraries[url].complete();
        };
        const head = document.getElementsByTagName('head')[0];
        head.appendChild(style);
        return this._loadedLibraries[url].asObservable();
    }
}
QuillEditorService.ɵprov = i0.ɵɵdefineInjectable({ factory: function QuillEditorService_Factory() { return new QuillEditorService(i0.ɵɵinject(i1.DOCUMENT)); }, token: QuillEditorService, providedIn: "root" });
QuillEditorService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
QuillEditorService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpbGwtZWRpdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtcXVpbGwtbGl0ZS9zcmMvbGliL3F1aWxsLWVkaXRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQWMsUUFBUSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBSzNDLE1BQU0sT0FBTyxrQkFBa0I7SUFJN0IsWUFBK0MsUUFBYTtRQUFiLGFBQVEsR0FBUixRQUFRLENBQUs7UUFIcEQscUJBQWdCLEdBQTBDLEVBQUUsQ0FBQztJQUdOLENBQUM7SUFFaEUsYUFBYTtRQUNYLE9BQU8sUUFBUSxDQUFDO1lBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQywyQkFBMkIsQ0FBQztZQUM1QyxJQUFJLENBQUMsU0FBUyxDQUFDLDZCQUE2QixDQUFDO1NBQzlDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxVQUFVLENBQUMsR0FBVztRQUM1QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM5QixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNsRDtRQUVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBRWpELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUM7UUFDaEMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDcEIsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDakIsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDbkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4QyxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdkMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUVPLFNBQVMsQ0FBQyxHQUFXO1FBQzNCLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzlCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ2xEO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7UUFFakQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsS0FBSyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7UUFDeEIsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDakIsS0FBSyxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUM7UUFDekIsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4QyxDQUFDLENBQUM7UUFFRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV4QixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNuRCxDQUFDOzs7O1lBekRGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OzRDQUtjLE1BQU0sU0FBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXBsYXlTdWJqZWN0LCBPYnNlcnZhYmxlLCBmb3JrSm9pbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBRdWlsbEVkaXRvclNlcnZpY2Uge1xuICBwcml2YXRlIF9sb2FkZWRMaWJyYXJpZXM6IHsgW3VybDogc3RyaW5nXTogUmVwbGF5U3ViamVjdDxhbnk+IH0gPSB7fTtcbiAgcXVpbGxqczogYW55O1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgcmVhZG9ubHkgZG9jdW1lbnQ6IGFueSkge31cblxuICBsYXp5TG9hZFF1aWxsKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIGZvcmtKb2luKFtcbiAgICAgIHRoaXMubG9hZFNjcmlwdCgnYXNzZXRzL3F1aWxsL3F1aWxsLm1pbi5qcycpLFxuICAgICAgdGhpcy5sb2FkU3R5bGUoJ2Fzc2V0cy9xdWlsbC9xdWlsbC5zbm93LmNzcycpXG4gICAgXSk7XG4gIH1cblxuICBwcml2YXRlIGxvYWRTY3JpcHQodXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGlmICh0aGlzLl9sb2FkZWRMaWJyYXJpZXNbdXJsXSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2xvYWRlZExpYnJhcmllc1t1cmxdLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHRoaXMuX2xvYWRlZExpYnJhcmllc1t1cmxdID0gbmV3IFJlcGxheVN1YmplY3QoKTtcblxuICAgIGNvbnN0IHNjcmlwdCA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgIHNjcmlwdC5zcmMgPSB1cmw7XG4gICAgc2NyaXB0Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuX2xvYWRlZExpYnJhcmllc1t1cmxdLm5leHQoKTtcbiAgICAgIHRoaXMuX2xvYWRlZExpYnJhcmllc1t1cmxdLmNvbXBsZXRlKCk7XG4gICAgfTtcblxuICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2xvYWRlZExpYnJhcmllc1t1cmxdLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkU3R5bGUodXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGlmICh0aGlzLl9sb2FkZWRMaWJyYXJpZXNbdXJsXSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2xvYWRlZExpYnJhcmllc1t1cmxdLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHRoaXMuX2xvYWRlZExpYnJhcmllc1t1cmxdID0gbmV3IFJlcGxheVN1YmplY3QoKTtcblxuICAgIGNvbnN0IHN0eWxlID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgc3R5bGUuaHJlZiA9IHVybDtcbiAgICBzdHlsZS5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgc3R5bGUub25sb2FkID0gKCkgPT4ge1xuICAgICAgdGhpcy5fbG9hZGVkTGlicmFyaWVzW3VybF0ubmV4dCgpO1xuICAgICAgdGhpcy5fbG9hZGVkTGlicmFyaWVzW3VybF0uY29tcGxldGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cbiAgICByZXR1cm4gdGhpcy5fbG9hZGVkTGlicmFyaWVzW3VybF0uYXNPYnNlcnZhYmxlKCk7XG4gIH1cbn1cbiJdfQ==