//ANCHOR views
const checklistsContainer = document.getElementById("checklistsContainer")

var checklistGroupI = -1
var elementIdI = -99

function main(){
    nextChecklistGroup()
}


//ANCHOR adds and initializes checklist group element
function nextChecklistGroup(){
    updateChecklistIndexes()

    if(checklistGroupI >= checklistGroups.length)
        return

    const checklistGroup = checklistGroups[checklistGroupI]
    const checklistGroupElement = addChecklistGroupElement(checklistGroupI)

    addChecklistGroupHeaderElement(checklistGroupElement, checklistGroup.header)
    const amountAdded = addChecklistItemElements(checklistGroupElement, checklistGroup.items)
    checklistGroup.itemAmountOnScreen = amountAdded

    animateShowGroup(checklistGroupElement)

    if(amountAdded == checklistGroup.finishedItemsIds.length)
        nextChecklistGroup()

}
function updateChecklistIndexes(){
    checklistGroupI ++
    elementIdI = checklistGroupI * 100 - 1
}
function addChecklistGroupElement(checklistGroupI){
    const checklistGroupElement = document.createElement("div")
    checklistGroupElement.className = "checklistGroupElement"
    checklistGroupElement.id = checklistGroupI.toString()
    checklistsContainer.appendChild(checklistGroupElement)
    return checklistGroupElement
}


function addChecklistGroupHeaderElement(checklistGroupElement, headerStr){
    header = document.createElement("h2")
    header.innerHTML = headerStr
    header.className = "checklistGroupHeader"
    checklistGroupElement.appendChild(header)
}


//ANCHOR adds checklist items
function addChecklistItemElements(checklistGroupElement, checklistItems){
    let itemsAdded = 0
    const allTags = getAllCollectedTags()
    for(checklistItem of checklistItems){
        if(tagHidingElement(allTags, checklistItem.showRules))
            continue

        addDescItemElement(checklistGroupElement, checklistItem.name)
        addChecklistItemElement(checklistGroupElement, checklistItem)

        itemsAdded++
    }
    return itemsAdded
}
function getAllCollectedTags(){
    let tags = []
    for (checklistGroupItem of checklistGroups){
        for (tag of checklistGroupItem.collectedTags){
            tags.push(tag)
        }
    }
    return tags
}
function tagHidingElement(allTags, showRules){
    const anyTagsInList = tagsInList(allTags, showRules.tags)

    switch (showRules.type){
        case "BAN":
            return anyTagsInList
        case "NEEDS":
            return !anyTagsInList
        default:
            return false
    }
}
function tagsInList(allTags, showRuleTags){
    for(tag of allTags){
        for (showRuleTag of showRuleTags){
            if(tag.name === showRuleTag)
                return true
        }
    }

    return false
}
function addDescItemElement(checklistGroupElement, desc){
    const descItem = document.createElement("p")
    descItem.innerHTML = desc
    descItem.className = "checklistItemDesc"
    checklistGroupElement.appendChild(descItem)
}
function addChecklistItemElement(checklistGroupElement, checklistItem){
    var element

    switch(checklistItem.type){
        case "select": 
            element = createChecklistSelect(checklistItem)
            break
        case "radio":
            element = createRadioBtnsElement(checklistItem)
            break
        case "number":
            element = createNumberInput(checklistItem)
            break
        case "link":
            openChecklistItemPage(checklistItem)
            return
        default:
            alert("Invalid checklistItemType: " + checklistItem.type)
    }   

    element.id = getNextElementId()
    checklistGroupElement.appendChild(element)
}


//ANCHOR adds select element with options
function createChecklistSelect(checklistItem){
    const selectElement = document.createElement("select")
    selectElement.addEventListener("change", selectListener)
    
    addSelectDefaultTextElement(selectElement)
    addSelectOptions(selectElement, checklistItem.items)

    return selectElement
}
function addSelectDefaultTextElement(selectElement){
    selectElement.innerHTML += "<option hidden disabled selected value> -- Select an option -- </option>"
}
function addSelectOptions(selectElement, options){
    for (option of options){
        addSelectOptionElement(selectElement, option.text)
    }
}
function addSelectOptionElement(selectElement, optionStr){
    const optionElement = document.createElement("option")
    optionElement.value = optionStr
    optionElement.innerHTML = optionStr
    selectElement.appendChild(optionElement)
}


//ANCHOR creates radiobtns element
function createRadioBtnsElement(checklistItem){
    const radioHolder = document.createElement("div")

    for(checklistItemItem of checklistItem.items){
        const radioBtn = createRadioBtnWText(checklistItemItem.text)
        radioHolder.appendChild(radioBtn)
    }

    return radioHolder
}
function createRadioBtnWText(text){
    const label = createRadioBtnLabel(text)
    const radioBtn = createRadioBtn()
    label.appendChild(radioBtn)
    return label
}
function createRadioBtnLabel(text){
    const label = document.createElement("label")
    label.textContent = text
    return label
}
function createRadioBtn(){
    const radioBtn = document.createElement("input")
    radioBtn.type = "radio"
    radioBtn.addEventListener("click", checkListener)

    elementIdIStr = elementIdI.toString() //Not getter to not increment number
    radioBtn.name = elementIdI
    return radioBtn
}

function createNumberInput(checklistItem){
    const numberInputDiv = document.createElement("div")
    numberInputDiv.appendChild(createNumberElement())
    numberInputDiv.appendChild(createNumberSubmitBtn())

    return numberInputDiv
}
function createNumberElement(){
    const numberInput = document.createElement("input")
    numberInput.type = "number"
    numberInput.className = "numberInput"

    return numberInput
}
function createNumberSubmitBtn(){
    const btn = document.createElement("button")
    btn.innerText = "Submit"
    btn.className = "textSubmitBtn"
    btn.addEventListener("click", textInputListener)

    return btn
}


//ANCHOR link element
function openChecklistItemPage(checklistItem){
    const url = checklistItem.items[0].text
    window.open(url, '_blank')
}


function getNextElementId(){
    elementIdI ++
    return elementIdI.toString()
}


function animateShowGroup(elem){
    animateHightExpand(elem) //calls opacity
}
function animateHightExpand(elem){
    var id = setInterval(heightFrame, 5);
    console.log(elem.offsetHeight)
    var maxHeight = elem.offsetHeight;
    var lastMeasuredHeight = -1

    function heightFrame() {
        var measuredHeight = elem.offsetHeight
        if (measuredHeight == lastMeasuredHeight) {
            clearInterval(id);
            opacity(elem)
            return
        }
        lastMeasuredHeight = measuredHeight
        maxHeight += 2; 
        elem.style.maxHeight = maxHeight + 'px'; 
    }
}
function opacity(elem){
    var id = setInterval(slideFrame, 10);
    var opacity = 0

    function slideFrame() {
        if (opacity == 1){
            clearInterval(id)
            return
        }
        elem.style.opacity = opacity; 
        opacity += 0.04;
    }
}


main()