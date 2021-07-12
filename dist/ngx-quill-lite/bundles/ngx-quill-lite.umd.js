(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('ngx-quill-lite', ['exports', '@angular/core', 'rxjs', '@angular/common', '@angular/forms'], factory) :
    (global = global || self, factory(global['ngx-quill-lite'] = {}, global.ng.core, global.rxjs, global.ng.common, global.ng.forms));
}(this, (function (exports, i0, rxjs, i1, forms) { 'use strict';

    var QuillEditorService = /** @class */ (function () {
        function QuillEditorService(document) {
            this.document = document;
            this._loadedLibraries = {};
        }
        QuillEditorService.prototype.lazyLoadQuill = function () {
            return rxjs.forkJoin([
                this.loadScript('assets/quill/quill.min.js'),
                this.loadStyle('assets/quill/quill.snow.css')
            ]);
        };
        QuillEditorService.prototype.loadScript = function (url) {
            var _this = this;
            if (this._loadedLibraries[url]) {
                return this._loadedLibraries[url].asObservable();
            }
            this._loadedLibraries[url] = new rxjs.ReplaySubject();
            var script = this.document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = url;
            script.onload = function () {
                _this._loadedLibraries[url].next();
                _this._loadedLibraries[url].complete();
            };
            this.document.body.appendChild(script);
            return this._loadedLibraries[url].asObservable();
        };
        QuillEditorService.prototype.loadStyle = function (url) {
            var _this = this;
            if (this._loadedLibraries[url]) {
                return this._loadedLibraries[url].asObservable();
            }
            this._loadedLibraries[url] = new rxjs.ReplaySubject();
            var style = this.document.createElement('link');
            style.type = 'text/css';
            style.href = url;
            style.rel = 'stylesheet';
            style.onload = function () {
                _this._loadedLibraries[url].next();
                _this._loadedLibraries[url].complete();
            };
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(style);
            return this._loadedLibraries[url].asObservable();
        };
        return QuillEditorService;
    }());
    QuillEditorService.ɵprov = i0.ɵɵdefineInjectable({ factory: function QuillEditorService_Factory() { return new QuillEditorService(i0.ɵɵinject(i1.DOCUMENT)); }, token: QuillEditorService, providedIn: "root" });
    QuillEditorService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    QuillEditorService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [i1.DOCUMENT,] }] }
    ]; };

    var QuillEditorComponent = /** @class */ (function () {
        function QuillEditorComponent(elementRef, zone, svc, document) {
            this.elementRef = elementRef;
            this.zone = zone;
            this.svc = svc;
            this.document = document;
            this.html = '';
            this.htmlChange = new i0.EventEmitter();
            this.showEditor = false;
        }
        QuillEditorComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.svc.lazyLoadQuill().subscribe(function (_) {
                if (!Quill) {
                    Quill = _this.document.defaultView.Quill;
                }
                _this.setupQuill();
            });
        };
        QuillEditorComponent.prototype.setupQuill = function () {
            var _this = this;
            if (!Quill) {
                return;
            }
            // use generic align styles
            // const align = Quill.import('attributors/style/align');
            // align.whitelist = ['right', 'center', 'justify'];
            // Quill.register(align, true);
            var toolbarElem = this.elementRef.nativeElement.querySelector('[quill-editor-toolbar]');
            var editorElem = this.elementRef.nativeElement.querySelector('[quill-editor-container]');
            this.quillEditor = new Quill(editorElem, {
                format: 'html',
                theme: 'snow',
                modules: {
                    toolbar: toolbarElem
                }
            });
            var contents = this.quillEditor.clipboard.convert(this.html);
            this.quillEditor.setContents(contents, 'silent');
            this.quillEditor.history.clear();
            this.textChangeEvent = this.quillEditor.on('text-change', function (delta, oldDelta, source) {
                if (source === 'user') {
                    var html_1 = _this.quillEditor.root.innerHTML;
                    if (html_1 === '<p><br></p>' || html_1 === '<div><br><div>') {
                        html_1 = null;
                    }
                    _this.zone.run(function () {
                        _this.htmlChange.emit(html_1);
                    });
                }
            });
        };
        QuillEditorComponent.prototype.ngOnDestroy = function () {
            if (this.textChangeEvent) {
                this.textChangeEvent.removeListener('text-change');
            }
        };
        return QuillEditorComponent;
    }());
    QuillEditorComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'quill-editor',
                    template: "<div quill-editor-toolbar>\n  <span class=\"ql-formats\">\n    <select class=\"ql-header\" title=\"Heading\">\n      <option value=\"1\"></option>\n      <option value=\"2\"></option>\n      <option value=\"3\"></option>\n      <option value=\"4\"></option>\n      <option value=\"5\"></option>\n      <option selected=\"selected\"></option>\n    </select>\n  </span>\n  <span class=\"ql-formats\">\n    <button class=\"ql-bold\" title=\"Bold\"></button>\n    <button class=\"ql-italic\" title=\"Italic\"></button>\n    <button class=\"ql-underline\" title=\"Underline\"></button>\n    <button class=\"ql-strike\" title=\"Strike\"></button>\n  </span>\n  <span class=\"ql-formats\">\n    <button class=\"ql-link\" title=\"Link\"></button>\n    <button class=\"ql-blockquote\" title=\"Block Quote\"></button>\n    <button class=\"ql-code-block\" title=\"Code Block\"></button>\n    <button class=\"ql-script\" value=\"sub\" title=\"Subscript\"></button>\n    <button class=\"ql-script\" value=\"super\" title=\"Superscript\"></button>\n  </span>\n  <span class=\"ql-formats\">\n    <button class=\"ql-list\" value=\"ordered\" title=\"Ordered List\"></button>\n    <button class=\"ql-list\" value=\"bullet\" title=\"Bullet List\"></button>\n    <button class=\"ql-indent\" value=\"-1\" title=\"Increase Indent\"></button>\n    <button class=\"ql-indent\" value=\"+1\" title=\"Decrease Indent\"></button>\n  </span>\n  <span class=\"ql-formats\">\n    <select class=\"ql-color\" title=\"Font Color\">\n      <option selected></option>\n      <option value=\"#ffffff\"></option>\n      <option value=\"#eeeeee\"></option>\n      <option value=\"#808080\"></option>\n      <option value=\"#ff0000\"></option>\n      <option value=\"#00ff00\"></option>\n      <option value=\"#0000ff\"></option>\n    </select>\n    <select class=\"ql-background\" title=\"Background Color\">\n      <option selected></option>\n      <option value=\"#eeeeee\"></option>\n      <option value=\"#808080\"></option>\n      <option value=\"#000000\"></option>\n      <option value=\"#ff0000\"></option>\n      <option value=\"#00ff00\"></option>\n      <option value=\"#0000ff\"></option>\n    </select>\n  </span>\n  <span class=\"ql-formats\">\n    <select class=\"ql-align\" title=\"Aligment\">\n      <option selected></option>\n      <option value=\"center\"></option>\n      <option value=\"right\"></option>\n      <option value=\"justify\"></option>\n    </select>\n  </span>\n</div>\n<div quill-editor-container></div>\n",
                    styles: [""]
                },] }
    ];
    QuillEditorComponent.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: i0.NgZone },
        { type: QuillEditorService },
        { type: undefined, decorators: [{ type: i0.Inject, args: [i1.DOCUMENT,] }] }
    ]; };
    QuillEditorComponent.propDecorators = {
        html: [{ type: i0.Input }],
        htmlChange: [{ type: i0.Output }]
    };

    var NgxQuillLite = /** @class */ (function () {
        function NgxQuillLite() {
        }
        return NgxQuillLite;
    }());
    NgxQuillLite.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [QuillEditorComponent],
                    imports: [i1.CommonModule, forms.FormsModule],
                    exports: [QuillEditorComponent]
                },] }
    ];

    /*
     * Public API Surface of ngx-quill-lite
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NgxQuillLite = NgxQuillLite;
    exports.QuillEditorComponent = QuillEditorComponent;
    exports.QuillEditorService = QuillEditorService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-quill-lite.umd.js.map
