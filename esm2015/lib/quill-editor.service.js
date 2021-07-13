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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpbGwtZWRpdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtcXVpbGwtbGl0ZS9zcmMvbGliL3F1aWxsLWVkaXRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQWMsUUFBUSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBSzNDLE1BQU0sT0FBTyxrQkFBa0I7SUFJN0IsWUFBK0MsUUFBYTtRQUFiLGFBQVEsR0FBUixRQUFRLENBQUs7UUFIcEQscUJBQWdCLEdBQTBDLEVBQUUsQ0FBQztJQUdOLENBQUM7SUFFaEUsYUFBYTtRQUNYLE9BQU8sUUFBUSxDQUFDO1lBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQywyQkFBMkIsQ0FBQztZQUM1QyxJQUFJLENBQUMsU0FBUyxDQUFDLDZCQUE2QixDQUFDO1NBQzlDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxVQUFVLENBQUMsR0FBVztRQUM1QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM5QixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNsRDtRQUVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBRWpELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUM7UUFDaEMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDcEIsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDakIsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDbkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4QyxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdkMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUVPLFNBQVMsQ0FBQyxHQUFXO1FBQzNCLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzlCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ2xEO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7UUFFakQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsS0FBSyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7UUFDeEIsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDakIsS0FBSyxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUM7UUFDekIsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4QyxDQUFDLENBQUM7UUFFRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV4QixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNuRCxDQUFDOzs7O1lBekRGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OzRDQUtjLE1BQU0sU0FBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJlcGxheVN1YmplY3QsIE9ic2VydmFibGUsIGZvcmtKb2luIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFF1aWxsRWRpdG9yU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfbG9hZGVkTGlicmFyaWVzOiB7IFt1cmw6IHN0cmluZ106IFJlcGxheVN1YmplY3Q8YW55PiB9ID0ge307XHJcbiAgcXVpbGxqczogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIHJlYWRvbmx5IGRvY3VtZW50OiBhbnkpIHt9XHJcblxyXG4gIGxhenlMb2FkUXVpbGwoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiBmb3JrSm9pbihbXHJcbiAgICAgIHRoaXMubG9hZFNjcmlwdCgnYXNzZXRzL3F1aWxsL3F1aWxsLm1pbi5qcycpLFxyXG4gICAgICB0aGlzLmxvYWRTdHlsZSgnYXNzZXRzL3F1aWxsL3F1aWxsLnNub3cuY3NzJylcclxuICAgIF0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBsb2FkU2NyaXB0KHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGlmICh0aGlzLl9sb2FkZWRMaWJyYXJpZXNbdXJsXSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fbG9hZGVkTGlicmFyaWVzW3VybF0uYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fbG9hZGVkTGlicmFyaWVzW3VybF0gPSBuZXcgUmVwbGF5U3ViamVjdCgpO1xyXG5cclxuICAgIGNvbnN0IHNjcmlwdCA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xyXG4gICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcclxuICAgIHNjcmlwdC5zcmMgPSB1cmw7XHJcbiAgICBzY3JpcHQub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLl9sb2FkZWRMaWJyYXJpZXNbdXJsXS5uZXh0KCk7XHJcbiAgICAgIHRoaXMuX2xvYWRlZExpYnJhcmllc1t1cmxdLmNvbXBsZXRlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLl9sb2FkZWRMaWJyYXJpZXNbdXJsXS5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbG9hZFN0eWxlKHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGlmICh0aGlzLl9sb2FkZWRMaWJyYXJpZXNbdXJsXSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fbG9hZGVkTGlicmFyaWVzW3VybF0uYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fbG9hZGVkTGlicmFyaWVzW3VybF0gPSBuZXcgUmVwbGF5U3ViamVjdCgpO1xyXG5cclxuICAgIGNvbnN0IHN0eWxlID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XHJcbiAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcclxuICAgIHN0eWxlLmhyZWYgPSB1cmw7XHJcbiAgICBzdHlsZS5yZWwgPSAnc3R5bGVzaGVldCc7XHJcbiAgICBzdHlsZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2xvYWRlZExpYnJhcmllc1t1cmxdLm5leHQoKTtcclxuICAgICAgdGhpcy5fbG9hZGVkTGlicmFyaWVzW3VybF0uY29tcGxldGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcbiAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5fbG9hZGVkTGlicmFyaWVzW3VybF0uYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==