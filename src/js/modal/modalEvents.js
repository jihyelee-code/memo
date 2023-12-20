import tippy from "tippy.js";
import 'tippy.js/dist/tippy.css';
import { store } from "../reducer/store";
import { baser } from "../../app.js";
import { getZIndex } from "../reducer/modal";

/**
 * @author JHLEE
 * @class ModalEvents
 * @constructor
 * @classdesc
 *  if you like to add modal visibility event,
 *  1. add id to trigger
 *  2. add modal name to data-name atttibute to trigger
 *  3. add name attribute same as id value to the modal
 *  4. add data-name attribute same as data-name attrib to the modal header
 *  ex)
 *  <TriggerLink id="trigger" data-name: "Trigger" />
 *  <Modal name="trigger" >
 *      <ModalHeader data-name="Trigger"/>
 *  </Modal>
 *   tips: Don't forget to add the modal in your index.html
 *         Don't forget to add the id of the modal to the function 'getIdListContainModal'
 *         Don't forget to add the modal information to the redux modal store
 */
export function ModalEvents(modal, datastore){
  this.MODAL_ERROR = '.modal-input-container.error';
  this.ROLE_ERROR = '[data-role="error"]';
  this.ROLE_CLOSE = '[data-role="close"]';
  this.ROLE_RESET = '[data-role="reset"]';
  this.ROLE_APPLY = '[data-role="apply"]';
  this.ROLE_CONFIRM = '[data-role="confirm"]';
  this.ROLE_UPLOAD = '[data-role="upload"]';
  this.ROLE_SET_TYPE = '[data-role="set-type"]';
  this.ROLE_CONTENT = '[name="content-section"]';
  this.TYPE_RADIO = '[data-type="radio"]';
  this.TYPE_TAB = '[data-type="tab"]';
  this.body = document.querySelector('body');
  this.modal = modal;
  this.modalHeader = modal.querySelector('[name="modal-header"]');
  this.modalName = this.modalHeader ? this.modalHeader.dataset.name : null;
  this.icon = this.modalHeader ? modal.querySelector('[name="modal-header-title"]').querySelector('i').dataset.name : null;
  this.datastore = datastore ? datastore : null;
  this.contentSections = this.modal.querySelectorAll(this.ROLE_CONTENT);
}


/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Modal reset event function. Define what would do after user clicks 'reset' button on the modal.
 */
 ModalEvents.prototype.setResetEvent = function (callback){
  const resetBtn = this.modal.querySelector(this.ROLE_RESET);
  //for language pack
  resetBtn.setAttribute('data-name', resetBtn.dataset.des);
  // tippy(resetBtn, {
  //   content: resetBtn.dataset.des 
  // });

  resetBtn.addEventListener('click', e => {
    e.preventDefault();

    this.removeErrorEffect();

    //to get default data as current data, do initliaze first
    if(this.datastore){
      const data = this.datastore.defaultData;
      this.datastore.asDefaultType && this.datastore.asDefaultType();
      this.setInputValues(data);
    }
    // this.deactiveConfirmBtn();
    this.activeApplyBtn && this.activeApplyBtn();
    this.activeConfirmBtn();
    this.deactiveResetBtn();
    
    callback && callback();

  });
 }


/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Modal apply event function. Define what would do after user clicks 'apply' button on the modal.
 */
 ModalEvents.prototype.setApplyEvent = function (ajaxConfig){
  const confirmBtn = this.modal.querySelector(this.ROLE_APPLY);
  confirmBtn.addEventListener('click', e => {
    e.preventDefault();
    //the container might having error effect previously
    this.removeErrorEffect();

    //take all the html values to data store: where you want to set the values
    const {isSuccess, msg, container} = this.setDatastoreValues();
    if(isSuccess && ajaxConfig){
      //ajax area
      baser.asker.askAPI(ajaxConfig, this.datastore);
    }else{
      const span = this.modal.querySelector(this.ROLE_ERROR);
      //set error msg
      span.textContent = msg;
      //set the input container border color
      container.classList.add('error');
    }
  })
 }



/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Modal confirm event function. Define what would do after user clicks 'confirm' button on the modal.
 */
 ModalEvents.prototype.setConfirmEvent = function (ajaxConfig){
  const confirmBtn = this.modal.querySelector(this.ROLE_CONFIRM);

  confirmBtn.addEventListener('click', e => {
    e.preventDefault();
    //the container might having error effect previously
    this.removeErrorEffect();

    //take all the html values to data store: where you want to set the values
    const {isSuccess, msg, container} = this.setDatastoreValues();
    
    if(isSuccess && ajaxConfig){
      //ajax area
      // ajaxConfig.callback = {

      // }
      baser.asker.askAPI(ajaxConfig, this.datastore);

    // }else if(!isSuccess && ajaxConfig || !isSuccess){
    }else if(!isSuccess && ajaxConfig ){
      this.setError(msg, container);
    }
  })
 }

 ModalEvents.prototype.setError = function (msg, container){
  const span = this.modal.querySelector(this.ROLE_ERROR);
  //set error msg
  span.textContent = msg;
  //set the input container border color
  container.classList.add('error');
 }

 ModalEvents.prototype.setUploadEvent = function (callback){
  const btn = this.modal.querySelector(this.ROLE_UPLOAD);
  btn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();

    //set file-upload event
    const input = btn.nextElementSibling; //input[type="file"]
    input.click();

    input.addEventListener('change', e => callback(e))
  }) 
 }

/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Modal close event function. Define  what would do after user clicks 'close' button on the modal.
 */
ModalEvents.prototype.setCloseEvent = function (callback, isReadOnly = false){
  const closeBtns =  this.modal.querySelectorAll(this.ROLE_CLOSE);
  closeBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      const common = baser.common;
      common.deactive(this.modal);

      //reset error alert
      this.removeErrorEffect();

      if(this.datastore && !isReadOnly){
        //set html values with data store data
        this.setInputValues();
        this.deactiveApplyBtn && this.deactiveApplyBtn();
        this.deactiveConfirmBtn();
      }

      callback && callback();

      store.dispatch({ type: "current/reset"});
      store.dispatch({ type: "modal/deactivate", name: this.modalName });
      store.dispatch({ type: "statusbar/deactive", name: this.modalName });

    })
  })
}

/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description As you click the radio designed <ul></ul>, active target ul and disable other uls
 */
 ModalEvents.prototype.setRadioEvent = function (){
  const radios = this.modal.querySelectorAll(this.TYPE_RADIO);

  radios.forEach((radio) => {
    const title = radio.querySelector('li');
    title.addEventListener("click", e => this.focusedRadioUlHandler(e, this))
  });
}


/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description active triggered ul
 */
 ModalEvents.prototype.focusedRadioUlHandler = function (e, _this){
   e.preventDefault();
   const radioUls = _this.modal.querySelectorAll(this.TYPE_RADIO);
   const common = baser.common;
   //remove 'active' class name
   radioUls.forEach( each => {
     const label = each.querySelector(this.ROLE_SET_TYPE);
     common.deactive(label);
     common.deactive(each);
     each.querySelectorAll('li input').forEach(input => input.setAttribute('readonly', "true"));
 
   });

  //add 'active' class name to target label
  const radioUl = e.currentTarget.parentElement;
  const lightBulb = radioUl.querySelector(this.ROLE_SET_TYPE);
  common.active(lightBulb);
  common.active(radioUl);
  radioUl.querySelectorAll('li input').forEach(input => input.readOnly = "");
  this.activeConfirmBtn();
}


/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Reset modal's error effect
 */
 ModalEvents.prototype.removeErrorEffect = function (){
    const errorModals = this.modal.querySelectorAll(this.MODAL_ERROR);

    if(errorModals){
      errorModals.forEach( modal => {
        modal.classList.remove('error');
      });
    }
    
    const spans = this.modal.querySelectorAll(this.ROLE_ERROR);
    if(spans){
      spans.forEach( span => {
        span.textContent = null;
      });
    }
}


/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Reset modal's input information
 */
 ModalEvents.prototype.setInputInfo = function (){
  const typedData = this.datastore.getData();
  const uls = this.contentSections;

  uls.forEach((ul) => {
    const lis = ul.querySelectorAll("li");
    lis.forEach((li) => {
      const [type, area, name] = li.id.split("_");
      const input = li.querySelector('select') ? li.querySelector('select') : li.querySelector('textarea') ? li.querySelector('textarea') : li.querySelector('input');
      const data = typedData[area] && typedData[area][name] ? typedData[area][name] : typedData[name];

      //set unit of the value
      if (input.nextElementSibling) {
        if (
          input.nextElementSibling.nodeName === "SPAN" ||
          input.nextElementSibling.tagName === "SPAN"
        ) {
          input.nextElementSibling.textContent = data.units;
        }
      }
      //set name and description
      // const span = li.querySelector(".modal-input-title");
      // span.title = data.description;

      //set tippy content
      // const btn = li.querySelector('[aria-describedby]');
      const btn = li.querySelector('[data-des]');
      btn.dataset.des = data.description;

      // tippy(btn, {
      //   content: btn.dataset.des
      // });
    });
  });
}

/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Set HTML input values from datastore
 */
 ModalEvents.prototype.setInputValues = function (inputDatas){
  const modal = this.modal;
  const typedData = inputDatas ? inputDatas : this.datastore.getData();
  let uls = modal.querySelectorAll('[name="content-section"]');

   //if modal has tabs
  //  const hasTab = modal.querySelector("[data-tab-name].active");
  //  if(hasTab) {
  //    //because the actived tab will be single one, you make it as an array.
  //    uls = [hasTab];
  //  }
 
   uls.forEach((ul) => {
     const lis = ul.querySelectorAll("li[id]");
     lis.forEach((li) => {
    
      const [type, area, name] = li.id.split("_");
      const input = li.querySelector('select') ? li.querySelector('select') : li.querySelector('textarea') ? li.querySelector('textarea') : li.querySelector('input');
      // console.log(typedData, type, area, name)
      const data = typedData[area] && typedData[area][name] ? typedData[area][name] : typedData[name];
      //set value
      input.value = data.value === 0 || data.value ? data.value : data;
     })
   });
 }

/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Triggered when user change the value of an input.
 */
 ModalEvents.prototype.inputChangeEvent = function (){
  const uls = this.contentSections;

  for(let i=0; i<uls.length; i++){
      const lis = uls[i].querySelectorAll("li[id]");

    for(let j=0; j<lis.length; j++){
      const input = lis[j].querySelector('select') ? lis[j].querySelector('select') : lis[j].querySelector('textarea') ? lis[j].querySelector('textarea') : lis[j].querySelector('input');
      
      if(input){
      
        input.addEventListener('input', e => {
          this.activeApplyBtn();
          this.activeConfirmBtn();
          this.activeResetBtn();
        });
          
        if(input.type === "number"){{
          input.addEventListener('keypress', e => {
            //allow only 'numbers' and 'period'
            // 46 : .
            // 47 : /
            // 57 : 9
            //allow only and 'minus' and 'period'
            if(e.which < 46 || e.which > 57 || e.which === 47){
              e.preventDefault();
            }   
            
          })
        }

      }
    }
  }
 }
}


/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Set the datastore value as user's input.
 */
ModalEvents.prototype.setDatastoreValues = function (){
    if(!this.datastore){
        return {isSuccess: true, msg: null, contianer: null};
    }
    const uls = this.contentSections;
    let isSuccess = true;
    let msg = "";
    let container = null; //to set css effect of input container

    for(let i=0; i<uls.length; i++){
        const lis = uls[i].querySelectorAll("li[id]");

        for(let j=0; j<lis.length; j++){
            const input = lis[j].querySelector('select') ? lis[j].querySelector('select') : lis[j].querySelector('textarea') ? lis[j].querySelector('textarea') : lis[j].querySelector('input');
            
            let value = input.value;
            const [type, area, name] = lis[j].id.split("_"); //ex)rotor_slot_er

            if(type && area && name){
              //validate the user's input
              const response = this.datastore.validate(area, name, value);
              container = input.parentElement;
              
              //set the values to datastore only when validated
              if(response.isValidate){
                this.datastore.setData(area, name, value);
              }else{
                isSuccess = false;
                msg = response.msg;
                return {isSuccess, msg, container}
              }
            }
        }
    }

    return {isSuccess, msg, container};
}


/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description When user clicked a tab, show the focused tab should be shown.
 */
ModalEvents.prototype.setCurrentTabPage = function (_this, tabBtn){
  const common = baser.common;
  const tabBtns = _this.modal.querySelectorAll(_this.TYPE_TAB);
  //set all the target list not visible
  const targetList = _this.modal.querySelectorAll('[data-tab-name]');
  targetList.forEach((div) => common.deactive(div));
  //set all the tab non active
  tabBtns.forEach((btn) => common.deactive(btn));

  //get target and show
  // const name = e.currentTarget.dataset.tabTarget;
  const tabName = tabBtn.dataset.tabTarget;
  const tabContainer = _this.modal.querySelector(`[data-tab-name="${tabName}"]`);
  common.active(tabContainer);
  common.active(tabBtn);
}


/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Update current modal information.
 */
ModalEvents.prototype.updateAsCurrent = function (_this){
  store.dispatch({ type: "statusbar/active", name: _this.modalName, icon: _this.icon });
  store.dispatch({ type: "modal/active", name: _this.modalName, zIndex: getZIndex() });
  store.dispatch({ type: "current/active", name: _this.modalName, isModal: true });
}

/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Add click event to tab to show the focused tab page.
 * Also, update z-index of the modal, in case if the focus was outside of the modal.
 */
ModalEvents.prototype.tabEventHandler = function (e){
    e.preventDefault();
    e.stopPropagation();

    const tabBtn = e.currentTarget;
    this.setCurrentTabPage(this, tabBtn);
    this.updateAsCurrent(this);
}


/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Update current clicked modal's z-index.
 */
ModalEvents.prototype.zIndexHandler = function(e){
    e.stopPropagation();
    this.updateAsCurrent(this);
}


/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Set default position and z-index value of modals.
 * The values will get updated by redux store.
 */
ModalEvents.prototype.setPosition = function (){
  const getModalInfo = (state) => state.modal;
  const modalInfo = getModalInfo(store.getState());

  //the title of the modal becomes the store's name property of the action
  const targetModal = modalInfo[this.modalName];
  this.modal.style.top = `${targetModal.y}px`;
  this.modal.style.left = typeof targetModal.x === "number" ? `${targetModal.x}px` : targetModal.x;
  this.modal.style.zIndex = targetModal.zIndex;
  this.modal.style.width = `${targetModal.width}px`;
  this.modal.style.height = `${targetModal.height}px`;

  //get updated info 
  this.subscribeState();
}


/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Subscribe modal's status
 */
ModalEvents.prototype.subscribeState = function(){
  store.subscribe( () => {
      this.updateModalState();
  });
}


/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Update modal information by subscribing it
 * @param {Element} modal Target modal
 * @param {string} name The name of the modal
 */
ModalEvents.prototype.updateModalState = function (){
  const state = store.getState();
  if (!state.current.isModal) {
    return;
  }
  
  const update = state.modal[this.modalName];

  if(update.x){
    this.modal.style.left = `${update.x}px`;
  }

  if(update.y){
    this.modal.style.top = `${update.y}px`;
  }

  if(update.zIndex){
    this.modal.style.zIndex = update.zIndex;
  }
  
  if(update.width){
    this.modal.style.width = `${update.width}px`;
  }

  if(update.height){
    this.modal.style.height = `${update.height}px`;
  }
   
}


/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Update current focused modal as none
 * @param {Event} e Event parameter
 */
ModalEvents.prototype.focusOutHandler = function (e){
    //if you use 'preventDefault' function of event param, some other function will not be triggered.
    e.stopPropagation();
    store.dispatch({ type: "current/active", name: null, isModal: false });
}


/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Give loading effect to the modal.
 */
ModalEvents.prototype.loadingEffect = function (){
  const common = baser.common;
  const loading = this.modal.querySelector('[data-role="loading"]');
  common.active(loading);
}


/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Remove loading effect of the modal.
 */
ModalEvents.prototype.removeLoadingEffect = function (){
  const common = baser.common;
  const loading = this.modal.querySelector('[data-role="loading"]');
  common.deactive(loading);
}


/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Active modal's confirm button
 */
ModalEvents.prototype.activeConfirmBtn = function (){
    const common = baser.common;
    const btn = this.modal.querySelector(this.ROLE_CONFIRM);
    if(btn){
        common.able(btn);
    }
}

/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Active modal's confirm button
 */
 ModalEvents.prototype.activeApplyBtn = function (){
  const common = baser.common;
  const btn = this.modal.querySelector(this.ROLE_APPLY);
  if(btn){
      common.able(btn);
  }
}

/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Deactive modal's confirm button
 */
 ModalEvents.prototype.deactiveConfirmBtn = function (){
    const common = baser.common;
    const btn = this.modal.querySelector(this.ROLE_CONFIRM);
    if(btn){
        common.disable(btn);
    }
}

/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Deactive modal's apply button
 */
 ModalEvents.prototype.deactiveApplyBtn = function (){
  const common = baser.common;
  const btn = this.modal.querySelector(this.ROLE_APPLY);
  if(btn){
      common.disable(btn);
  }
}


/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Active modal's reset button
 */
 ModalEvents.prototype.activeResetBtn = function (){
    const common = baser.common;
    const btn = common.elem(this.ROLE_RESET, this.modal);
    if(btn){
        common.able(btn);
    }
}

/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Deactive modal's reset button
 */
 ModalEvents.prototype.deactiveResetBtn = function (){
    const common = baser.common;
    const btn = common.elem(this.ROLE_RESET, this.modal);
    if(btn){
        common.disable(btn);
    }
}

/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Prevent user input string for input[type:"number"]
 */
ModalEvents.prototype.preventStringHandler = function (e){
  //allow only 'numbers' and 'minus' and 'period'
  if(e.which < 45 || e.which > 57 || e.which === 47){
    e.preventDefault();
  }   
  
  //prevent user type 'Minus' between number
  if(e.which === 45){
    if(e.target.value){
        e.preventDefault();
    }
  }

  this.activeApplyBtn();
  this.activeConfirmBtn();
  this.activeResetBtn();
 }


/**
 * @author JHLEE
 * @memberof ModalEvents
 * @function
 * @description Initialize all the modal events
 */
ModalEvents.prototype.init = function (){
  //disable confirm btn by default
  this.deactiveApplyBtn();
  this.deactiveConfirmBtn();
  this.deactiveResetBtn();
  
  //z index event
  this.modal.addEventListener('click', e => this.zIndexHandler(e));

  this.setPosition();

  //tab event
  const tabBtns = this.modal.querySelectorAll(this.TYPE_TAB);
  tabBtns.forEach( tabBtn => {
    tabBtn.addEventListener("click", e => this.tabEventHandler(e));
  });

  this.inputChangeEvent();

}

ModalEvents.prototype.initBody = function (){
  //modal fucus out event
  this.body.addEventListener("click", this.focusOutHandler);

}

