import { Component, ElementRef, Input, Output, EventEmitter, NgZone, Inject } from '@angular/core';
import { QuillEditorService } from '../quill-editor.service';
import { DOCUMENT } from '@angular/common';
export class QuillEditorComponent {
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
        const align = Quill.import('attributors/style/align');
        align.whitelist = ['right', 'center', 'justify'];
        Quill.register(align, true);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpbGwtZWRpdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1xdWlsbC1saXRlL3NyYy9saWIvcXVpbGwtZWRpdG9yL3F1aWxsLWVkaXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBRVosTUFBTSxFQUNOLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFTM0MsTUFBTSxPQUFPLG9CQUFvQjtJQU8vQixZQUNVLFVBQXNCLEVBQ3RCLElBQVksRUFDSCxHQUF1QixFQUNMLFFBQWE7UUFIeEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ0gsUUFBRyxHQUFILEdBQUcsQ0FBb0I7UUFDTCxhQUFRLEdBQVIsUUFBUSxDQUFLO1FBVnpDLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDVCxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUdsRCxlQUFVLEdBQUcsS0FBSyxDQUFDO0lBT2hCLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDckMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO2FBQ3pDO1lBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsT0FBTztTQUNSO1FBQ0QsMkJBQTJCO1FBQzNCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUN0RCxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNqRCxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUU1QixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQzdELHdCQUF3QixDQUN6QixDQUFDO1FBQ0YsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUM1RCwwQkFBMEIsQ0FDM0IsQ0FBQztRQUNGLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxLQUFLLENBQUMsVUFBVSxFQUFFO1lBQ3ZDLE1BQU0sRUFBRSxNQUFNO1lBQ2QsS0FBSyxFQUFFLE1BQU07WUFDYixPQUFPLEVBQUU7Z0JBQ1AsT0FBTyxFQUFFLFdBQVc7YUFDckI7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVqQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUN4QyxhQUFhLEVBQ2IsQ0FBQyxLQUFVLEVBQUUsUUFBYSxFQUFFLE1BQWMsRUFBUSxFQUFFO1lBQ2xELElBQUksTUFBTSxLQUFLLE1BQU0sRUFBRTtnQkFDckIsSUFBSSxJQUFJLEdBQWtCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDMUQsSUFBSSxJQUFJLEtBQUssYUFBYSxJQUFJLElBQUksS0FBSyxnQkFBZ0IsRUFBRTtvQkFDdkQsSUFBSSxHQUFHLElBQUksQ0FBQztpQkFDYjtnQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM3QixDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNwRDtJQUNILENBQUM7OztZQTNFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLDBrRkFBNEM7O2FBRTdDOzs7WUFqQkMsVUFBVTtZQUtWLE1BQU07WUFHQyxrQkFBa0I7NENBcUJ0QixNQUFNLFNBQUMsUUFBUTs7O21CQVZqQixLQUFLO3lCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgRWxlbWVudFJlZixcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE9uRGVzdHJveSxcclxuICBOZ1pvbmUsXHJcbiAgSW5qZWN0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFF1aWxsRWRpdG9yU2VydmljZSB9IGZyb20gJy4uL3F1aWxsLWVkaXRvci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuZGVjbGFyZSB2YXIgUXVpbGw6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAncXVpbGwtZWRpdG9yJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vcXVpbGwtZWRpdG9yLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9xdWlsbC1lZGl0b3IuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBRdWlsbEVkaXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBASW5wdXQoKSBodG1sID0gJyc7XHJcbiAgQE91dHB1dCgpIGh0bWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICBxdWlsbEVkaXRvcjogYW55O1xyXG4gIHByaXZhdGUgdGV4dENoYW5nZUV2ZW50OiBhbnk7XHJcbiAgc2hvd0VkaXRvciA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzdmM6IFF1aWxsRWRpdG9yU2VydmljZSxcclxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgcmVhZG9ubHkgZG9jdW1lbnQ6IGFueVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN2Yy5sYXp5TG9hZFF1aWxsKCkuc3Vic2NyaWJlKF8gPT4ge1xyXG4gICAgICBpZiAoIVF1aWxsKSB7XHJcbiAgICAgICAgUXVpbGwgPSB0aGlzLmRvY3VtZW50LmRlZmF1bHRWaWV3LlF1aWxsO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2V0dXBRdWlsbCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXR1cFF1aWxsKCkge1xyXG4gICAgaWYgKCFRdWlsbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAvLyB1c2UgZ2VuZXJpYyBhbGlnbiBzdHlsZXNcclxuICAgIGNvbnN0IGFsaWduID0gUXVpbGwuaW1wb3J0KCdhdHRyaWJ1dG9ycy9zdHlsZS9hbGlnbicpO1xyXG4gICAgYWxpZ24ud2hpdGVsaXN0ID0gWydyaWdodCcsICdjZW50ZXInLCAnanVzdGlmeSddO1xyXG4gICAgUXVpbGwucmVnaXN0ZXIoYWxpZ24sIHRydWUpO1xyXG5cclxuICAgIGNvbnN0IHRvb2xiYXJFbGVtID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgJ1txdWlsbC1lZGl0b3ItdG9vbGJhcl0nXHJcbiAgICApO1xyXG4gICAgY29uc3QgZWRpdG9yRWxlbSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICdbcXVpbGwtZWRpdG9yLWNvbnRhaW5lcl0nXHJcbiAgICApO1xyXG4gICAgdGhpcy5xdWlsbEVkaXRvciA9IG5ldyBRdWlsbChlZGl0b3JFbGVtLCB7XHJcbiAgICAgIGZvcm1hdDogJ2h0bWwnLFxyXG4gICAgICB0aGVtZTogJ3Nub3cnLFxyXG4gICAgICBtb2R1bGVzOiB7XHJcbiAgICAgICAgdG9vbGJhcjogdG9vbGJhckVsZW1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgY29udGVudHMgPSB0aGlzLnF1aWxsRWRpdG9yLmNsaXBib2FyZC5jb252ZXJ0KHRoaXMuaHRtbCk7XHJcbiAgICB0aGlzLnF1aWxsRWRpdG9yLnNldENvbnRlbnRzKGNvbnRlbnRzLCAnc2lsZW50Jyk7XHJcbiAgICB0aGlzLnF1aWxsRWRpdG9yLmhpc3RvcnkuY2xlYXIoKTtcclxuXHJcbiAgICB0aGlzLnRleHRDaGFuZ2VFdmVudCA9IHRoaXMucXVpbGxFZGl0b3Iub24oXHJcbiAgICAgICd0ZXh0LWNoYW5nZScsXHJcbiAgICAgIChkZWx0YTogYW55LCBvbGREZWx0YTogYW55LCBzb3VyY2U6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGlmIChzb3VyY2UgPT09ICd1c2VyJykge1xyXG4gICAgICAgICAgbGV0IGh0bWw6IHN0cmluZyB8IG51bGwgPSB0aGlzLnF1aWxsRWRpdG9yLnJvb3QuaW5uZXJIVE1MO1xyXG4gICAgICAgICAgaWYgKGh0bWwgPT09ICc8cD48YnI+PC9wPicgfHwgaHRtbCA9PT0gJzxkaXY+PGJyPjxkaXY+Jykge1xyXG4gICAgICAgICAgICBodG1sID0gbnVsbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmh0bWxDaGFuZ2UuZW1pdChodG1sKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMudGV4dENoYW5nZUV2ZW50KSB7XHJcbiAgICAgIHRoaXMudGV4dENoYW5nZUV2ZW50LnJlbW92ZUxpc3RlbmVyKCd0ZXh0LWNoYW5nZScpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=