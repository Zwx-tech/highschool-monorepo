// tinyMC imports
import tinymce, { Editor } from "tinymce";
import 'tinymce/skins/ui/oxide-dark/skin.min.css';
import 'tinymce/skins/content/dark/content.min.css';
import 'tinymce/skins/content/dark/content.css';
import 'tinymce/icons/default/icons';
import 'tinymce/themes/silver/theme';
import 'tinymce/models/dom/model';
import { closeSvg, saveSvg } from "./icons";

class CustomEditor{
    private isOpen = true;
    private containerRef: HTMLDivElement;
    private statusBarRef: HTMLDivElement;
    private tinymceEditor: Editor;
    
    constructor(containerRef: HTMLDivElement, statusBarRef: HTMLDivElement, editor: Editor) {
      this.containerRef = containerRef;
      console.log(this.containerRef);
      this.statusBarRef = statusBarRef;
      this.tinymceEditor = editor;
      this.statusBarRef.innerHTML = `<div>
        <button type="button">${saveSvg}</button>
        <button type="button">${closeSvg}</button>
      </div>`;

      this.close();
    }

    static async createEditor(inputSelector: string): Promise<CustomEditor> {
      await tinymce.baseURI.setPath('/tinymce');
      const editor = await tinymce.init({
          selector: inputSelector,
          content_css: false, 
          skin: false,
          resize: false
        });

        const containerRef = await document.querySelector<HTMLDivElement>('.tox-tinymce')!;
        const statusBarRef = await document.querySelector<HTMLDivElement>('.tox-statusbar__right-container')!;
        return new CustomEditor(containerRef, statusBarRef, editor[0]);
    }

    open(value: string): Promise<string | null> {
      return new Promise((resolve) => {
        if (!this.isOpen) {
          this.tinymceEditor.show();
          this.isOpen = true;
          this.tinymceEditor.setContent(value);
          const saveButton = this.statusBarRef.querySelector('.tox-statusbar__right-container button:first-child')!;
          const closeButton = this.statusBarRef.querySelector('.tox-statusbar__right-container button:nth-of-type(2)')!;
          saveButton.addEventListener('click', () => {
            const currentContent = tinymce.activeEditor?.getContent() || '';
            resolve(currentContent);
            this.close();
          });
          closeButton.addEventListener('click', () => {
            resolve(null);
            this.close();
          })
        }
      });
    }

    close() {
      if (this.isOpen) {
        this.tinymceEditor.hide();
        this.isOpen = false;
      }
    }

}

const editor = await CustomEditor.createEditor('textarea#editor');

export default editor;