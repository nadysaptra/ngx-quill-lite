import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Injectable, Input, NgModule, NgZone, Output, ɵɵdefineInjectable, ɵɵinject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin, ReplaySubject } from 'rxjs';

class QuillEditorService {
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
QuillEditorService.ɵprov = ɵɵdefineInjectable({ factory: function QuillEditorService_Factory() { return new QuillEditorService(ɵɵinject(DOCUMENT)); }, token: QuillEditorService, providedIn: "root" });
QuillEditorService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
QuillEditorService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];

class QuillEditorComponent {
    constructor(elementRef, zone, svc, document) {
        this.elementRef = elementRef;
        this.zone = zone;
        this.svc = svc;
        this.document = document;
        this.html = '';
        this.htmlChange = new EventEmitter();
        this.showEditor = false;
    }
    ngOnInit() {
        this.svc.lazyLoadQuill().subscribe(_ => {
            if (!Quill) {
                Quill = this.document.defaultView.Quill;
            }
            this.setupQuill();
        });
    }
    setupQuill() {
        if (!Quill) {
            return;
        }
        // use generic align styles
        // const align = Quill.import('attributors/style/align');
        // align.whitelist = ['right', 'center', 'justify'];
        // Quill.register(align, true);
        const toolbarElem = this.elementRef.nativeElement.querySelector('[quill-editor-toolbar]');
        const editorElem = this.elementRef.nativeElement.querySelector('[quill-editor-container]');
        this.quillEditor = new Quill(editorElem, {
            format: 'html',
            theme: 'snow',
            modules: {
                toolbar: toolbarElem
            }
        });
        const contents = this.quillEditor.clipboard.convert(this.html);
        this.quillEditor.setContents(contents, 'silent');
        this.quillEditor.history.clear();
        this.textChangeEvent = this.quillEditor.on('text-change', (delta, oldDelta, source) => {
            if (source === 'user') {
                let html = this.quillEditor.root.innerHTML;
                if (html === '<p><br></p>' || html === '<div><br><div>') {
                    html = null;
                }
                this.zone.run(() => {
                    this.htmlChange.emit(html);
                });
            }
        });
    }
    ngOnDestroy() {
        if (this.textChangeEvent) {
            this.textChangeEvent.removeListener('text-change');
        }
    }
}
QuillEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'quill-editor',
                template: "<div quill-editor-toolbar>\r\n  <span class=\"ql-formats\">\r\n    <select class=\"ql-header\" title=\"Heading\">\r\n      <option value=\"1\"></option>\r\n      <option value=\"2\"></option>\r\n      <option value=\"3\"></option>\r\n      <option value=\"4\"></option>\r\n      <option value=\"5\"></option>\r\n      <option selected=\"selected\"></option>\r\n    </select>\r\n  </span>\r\n  <span class=\"ql-formats\">\r\n    <button class=\"ql-bold\" title=\"Bold\"></button>\r\n    <button class=\"ql-italic\" title=\"Italic\"></button>\r\n    <button class=\"ql-underline\" title=\"Underline\"></button>\r\n    <button class=\"ql-strike\" title=\"Strike\"></button>\r\n  </span>\r\n  <span class=\"ql-formats\">\r\n    <button class=\"ql-link\" title=\"Link\"></button>\r\n    <button class=\"ql-blockquote\" title=\"Block Quote\"></button>\r\n    <button class=\"ql-code-block\" title=\"Code Block\"></button>\r\n    <button class=\"ql-script\" value=\"sub\" title=\"Subscript\"></button>\r\n    <button class=\"ql-script\" value=\"super\" title=\"Superscript\"></button>\r\n  </span>\r\n  <span class=\"ql-formats\">\r\n    <button class=\"ql-list\" value=\"ordered\" title=\"Ordered List\"></button>\r\n    <button class=\"ql-list\" value=\"bullet\" title=\"Bullet List\"></button>\r\n    <button class=\"ql-indent\" value=\"-1\" title=\"Increase Indent\"></button>\r\n    <button class=\"ql-indent\" value=\"+1\" title=\"Decrease Indent\"></button>\r\n  </span>\r\n  <span class=\"ql-formats\">\r\n    <select class=\"ql-color\" title=\"Font Color\">\r\n      <option selected></option>\r\n      <option value=\"#ffffff\"></option>\r\n      <option value=\"#eeeeee\"></option>\r\n      <option value=\"#808080\"></option>\r\n      <option value=\"#ff0000\"></option>\r\n      <option value=\"#00ff00\"></option>\r\n      <option value=\"#0000ff\"></option>\r\n    </select>\r\n    <select class=\"ql-background\" title=\"Background Color\">\r\n      <option selected></option>\r\n      <option value=\"#eeeeee\"></option>\r\n      <option value=\"#808080\"></option>\r\n      <option value=\"#000000\"></option>\r\n      <option value=\"#ff0000\"></option>\r\n      <option value=\"#00ff00\"></option>\r\n      <option value=\"#0000ff\"></option>\r\n    </select>\r\n  </span>\r\n  <span class=\"ql-formats\">\r\n    <select class=\"ql-align\" title=\"Aligment\">\r\n      <option selected></option>\r\n      <option value=\"center\"></option>\r\n      <option value=\"right\"></option>\r\n      <option value=\"justify\"></option>\r\n    </select>\r\n  </span>\r\n</div>\r\n<div quill-editor-container></div>\r\n",
                styles: [""]
            },] }
];
QuillEditorComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: QuillEditorService },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
QuillEditorComponent.propDecorators = {
    html: [{ type: Input }],
    htmlChange: [{ type: Output }]
};

class NgxQuillLite {
}
NgxQuillLite.decorators = [
    { type: NgModule, args: [{
                declarations: [QuillEditorComponent],
                imports: [CommonModule, FormsModule],
                exports: [QuillEditorComponent]
            },] }
];

/*
 * Public API Surface of ngx-quill-lite
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxQuillLite, QuillEditorComponent, QuillEditorService };
//# sourceMappingURL=ngx-quill-lite.js.map
