import { Observable } from 'rxjs';
export declare class QuillEditorService {
    private readonly document;
    private _loadedLibraries;
    quilljs: any;
    constructor(document: any);
    lazyLoadQuill(): Observable<any>;
    private loadScript;
    private loadStyle;
}
