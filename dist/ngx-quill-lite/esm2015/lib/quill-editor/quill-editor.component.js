import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, NgZone, Output } from '@angular/core';
import { QuillEditorService } from '../quill-editor.service';
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
                template: "<div quill-editor-toolbar>\n  <span class=\"ql-formats\">\n    <select class=\"ql-header\" title=\"Heading\">\n      <option value=\"1\"></option>\n      <option value=\"2\"></option>\n      <option value=\"3\"></option>\n      <option value=\"4\"></option>\n      <option value=\"5\"></option>\n      <option selected=\"selected\"></option>\n    </select>\n  </span>\n  <span class=\"ql-formats\">\n    <button class=\"ql-bold\" title=\"Bold\"></button>\n    <button class=\"ql-italic\" title=\"Italic\"></button>\n    <button class=\"ql-underline\" title=\"Underline\"></button>\n    <button class=\"ql-strike\" title=\"Strike\"></button>\n  </span>\n  <span class=\"ql-formats\">\n    <button class=\"ql-link\" title=\"Link\"></button>\n    <button class=\"ql-blockquote\" title=\"Block Quote\"></button>\n    <button class=\"ql-code-block\" title=\"Code Block\"></button>\n    <button class=\"ql-script\" value=\"sub\" title=\"Subscript\"></button>\n    <button class=\"ql-script\" value=\"super\" title=\"Superscript\"></button>\n  </span>\n  <span class=\"ql-formats\">\n    <button class=\"ql-list\" value=\"ordered\" title=\"Ordered List\"></button>\n    <button class=\"ql-list\" value=\"bullet\" title=\"Bullet List\"></button>\n    <button class=\"ql-indent\" value=\"-1\" title=\"Increase Indent\"></button>\n    <button class=\"ql-indent\" value=\"+1\" title=\"Decrease Indent\"></button>\n  </span>\n  <span class=\"ql-formats\">\n    <select class=\"ql-color\" title=\"Font Color\">\n      <option selected></option>\n      <option value=\"#ffffff\"></option>\n      <option value=\"#eeeeee\"></option>\n      <option value=\"#808080\"></option>\n      <option value=\"#ff0000\"></option>\n      <option value=\"#00ff00\"></option>\n      <option value=\"#0000ff\"></option>\n    </select>\n    <select class=\"ql-background\" title=\"Background Color\">\n      <option selected></option>\n      <option value=\"#eeeeee\"></option>\n      <option value=\"#808080\"></option>\n      <option value=\"#000000\"></option>\n      <option value=\"#ff0000\"></option>\n      <option value=\"#00ff00\"></option>\n      <option value=\"#0000ff\"></option>\n    </select>\n  </span>\n  <span class=\"ql-formats\">\n    <select class=\"ql-align\" title=\"Aligment\">\n      <option selected></option>\n      <option value=\"center\"></option>\n      <option value=\"right\"></option>\n      <option value=\"justify\"></option>\n    </select>\n  </span>\n</div>\n<div quill-editor-container></div>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpbGwtZWRpdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1xdWlsbC1saXRlL3NyYy9saWIvcXVpbGwtZWRpdG9yL3F1aWxsLWVkaXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXRILE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBUzdELE1BQU0sT0FBTyxvQkFBb0I7SUFPL0IsWUFDVSxVQUFzQixFQUN0QixJQUFZLEVBQ0gsR0FBdUIsRUFDTCxRQUFhO1FBSHhDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNILFFBQUcsR0FBSCxHQUFHLENBQW9CO1FBQ0wsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQVZ6QyxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1QsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFHbEQsZUFBVSxHQUFHLEtBQUssQ0FBQztJQU9oQixDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQzthQUN6QztZQUNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE9BQU87U0FDUjtRQUNELDJCQUEyQjtRQUMzQix5REFBeUQ7UUFDekQsb0RBQW9EO1FBQ3BELCtCQUErQjtRQUUvQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQzdELHdCQUF3QixDQUN6QixDQUFDO1FBQ0YsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUM1RCwwQkFBMEIsQ0FDM0IsQ0FBQztRQUNGLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxLQUFLLENBQUMsVUFBVSxFQUFFO1lBQ3ZDLE1BQU0sRUFBRSxNQUFNO1lBQ2QsS0FBSyxFQUFFLE1BQU07WUFDYixPQUFPLEVBQUU7Z0JBQ1AsT0FBTyxFQUFFLFdBQVc7YUFDckI7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVqQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUN4QyxhQUFhLEVBQ2IsQ0FBQyxLQUFVLEVBQUUsUUFBYSxFQUFFLE1BQWMsRUFBUSxFQUFFO1lBQ2xELElBQUksTUFBTSxLQUFLLE1BQU0sRUFBRTtnQkFDckIsSUFBSSxJQUFJLEdBQWtCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDMUQsSUFBSSxJQUFJLEtBQUssYUFBYSxJQUFJLElBQUksS0FBSyxnQkFBZ0IsRUFBRTtvQkFDdkQsSUFBSSxHQUFHLElBQUksQ0FBQztpQkFDYjtnQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM3QixDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNwRDtJQUNILENBQUM7OztZQTNFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLGs5RUFBNEM7O2FBRTdDOzs7WUFWbUIsVUFBVTtZQUErQixNQUFNO1lBRTFELGtCQUFrQjs0Q0FvQnRCLE1BQU0sU0FBQyxRQUFROzs7bUJBVmpCLEtBQUs7eUJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBOZ1pvbmUsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUXVpbGxFZGl0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vcXVpbGwtZWRpdG9yLnNlcnZpY2UnO1xuXG5kZWNsYXJlIHZhciBRdWlsbDogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdxdWlsbC1lZGl0b3InLFxuICB0ZW1wbGF0ZVVybDogJy4vcXVpbGwtZWRpdG9yLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcXVpbGwtZWRpdG9yLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBRdWlsbEVkaXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgaHRtbCA9ICcnO1xuICBAT3V0cHV0KCkgaHRtbENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBxdWlsbEVkaXRvcjogYW55O1xuICBwcml2YXRlIHRleHRDaGFuZ2VFdmVudDogYW55O1xuICBzaG93RWRpdG9yID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgc3ZjOiBRdWlsbEVkaXRvclNlcnZpY2UsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSByZWFkb25seSBkb2N1bWVudDogYW55XG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN2Yy5sYXp5TG9hZFF1aWxsKCkuc3Vic2NyaWJlKF8gPT4ge1xuICAgICAgaWYgKCFRdWlsbCkge1xuICAgICAgICBRdWlsbCA9IHRoaXMuZG9jdW1lbnQuZGVmYXVsdFZpZXcuUXVpbGw7XG4gICAgICB9XG4gICAgICB0aGlzLnNldHVwUXVpbGwoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldHVwUXVpbGwoKSB7XG4gICAgaWYgKCFRdWlsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyB1c2UgZ2VuZXJpYyBhbGlnbiBzdHlsZXNcbiAgICAvLyBjb25zdCBhbGlnbiA9IFF1aWxsLmltcG9ydCgnYXR0cmlidXRvcnMvc3R5bGUvYWxpZ24nKTtcbiAgICAvLyBhbGlnbi53aGl0ZWxpc3QgPSBbJ3JpZ2h0JywgJ2NlbnRlcicsICdqdXN0aWZ5J107XG4gICAgLy8gUXVpbGwucmVnaXN0ZXIoYWxpZ24sIHRydWUpO1xuXG4gICAgY29uc3QgdG9vbGJhckVsZW0gPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgJ1txdWlsbC1lZGl0b3ItdG9vbGJhcl0nXG4gICAgKTtcbiAgICBjb25zdCBlZGl0b3JFbGVtID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICdbcXVpbGwtZWRpdG9yLWNvbnRhaW5lcl0nXG4gICAgKTtcbiAgICB0aGlzLnF1aWxsRWRpdG9yID0gbmV3IFF1aWxsKGVkaXRvckVsZW0sIHtcbiAgICAgIGZvcm1hdDogJ2h0bWwnLFxuICAgICAgdGhlbWU6ICdzbm93JyxcbiAgICAgIG1vZHVsZXM6IHtcbiAgICAgICAgdG9vbGJhcjogdG9vbGJhckVsZW1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbnRlbnRzID0gdGhpcy5xdWlsbEVkaXRvci5jbGlwYm9hcmQuY29udmVydCh0aGlzLmh0bWwpO1xuICAgIHRoaXMucXVpbGxFZGl0b3Iuc2V0Q29udGVudHMoY29udGVudHMsICdzaWxlbnQnKTtcbiAgICB0aGlzLnF1aWxsRWRpdG9yLmhpc3RvcnkuY2xlYXIoKTtcblxuICAgIHRoaXMudGV4dENoYW5nZUV2ZW50ID0gdGhpcy5xdWlsbEVkaXRvci5vbihcbiAgICAgICd0ZXh0LWNoYW5nZScsXG4gICAgICAoZGVsdGE6IGFueSwgb2xkRGVsdGE6IGFueSwgc291cmNlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKHNvdXJjZSA9PT0gJ3VzZXInKSB7XG4gICAgICAgICAgbGV0IGh0bWw6IHN0cmluZyB8IG51bGwgPSB0aGlzLnF1aWxsRWRpdG9yLnJvb3QuaW5uZXJIVE1MO1xuICAgICAgICAgIGlmIChodG1sID09PSAnPHA+PGJyPjwvcD4nIHx8IGh0bWwgPT09ICc8ZGl2Pjxicj48ZGl2PicpIHtcbiAgICAgICAgICAgIGh0bWwgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaHRtbENoYW5nZS5lbWl0KGh0bWwpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnRleHRDaGFuZ2VFdmVudCkge1xuICAgICAgdGhpcy50ZXh0Q2hhbmdlRXZlbnQucmVtb3ZlTGlzdGVuZXIoJ3RleHQtY2hhbmdlJyk7XG4gICAgfVxuICB9XG59XG4iXX0=