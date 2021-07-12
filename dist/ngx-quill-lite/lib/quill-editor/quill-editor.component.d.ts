import { ElementRef, EventEmitter, NgZone, OnDestroy, OnInit } from '@angular/core';
import { QuillEditorService } from '../quill-editor.service';
export declare class QuillEditorComponent implements OnInit, OnDestroy {
    private elementRef;
    private zone;
    private readonly svc;
    private readonly document;
    html: string;
    htmlChange: EventEmitter<string>;
    quillEditor: any;
    private textChangeEvent;
    showEditor: boolean;
    constructor(elementRef: ElementRef, zone: NgZone, svc: QuillEditorService, document: any);
    ngOnInit(): void;
    setupQuill(): void;
    ngOnDestroy(): void;
}
