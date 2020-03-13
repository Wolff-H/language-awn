'use babel';

import LanguageAwnView from './language-awn-view';
import { CompositeDisposable } from 'atom';

export default {

  languageAwnView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageAwnView = new LanguageAwnView(state.languageAwnViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageAwnView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-awn:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageAwnView.destroy();
  },

  serialize() {
    return {
      languageAwnViewState: this.languageAwnView.serialize()
    };
  },

  toggle() {
    console.log('LanguageAwn was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
