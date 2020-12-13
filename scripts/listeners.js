//ANCHOR listenters
function selectListener(event){
    const target = event.target
    const value = target.value  
    handleFinishedChecklistItem(target.id, value)
}
function checkListener(event){
    const label = event.target.parentElement
    const radioBtnsDiv = label.parentElement
    const value = label.textContent
    
    handleFinishedChecklistItem(radioBtnsDiv.id, value)
}
function textInputListener(event){
    const textInputDiv = event.target.parentElement
    const textInput = textInputDiv.children[0]
    const inputText = textInput.value

    if(inputText == "")
        return

    handleFinishedChecklistItem(textInputDiv.id, inputText)
}


//ANCHOR listener handlers
function handleFinishedChecklistItem(id, selectedValue){
    const targetIdNumber = Number(id)
    const checklistItemI = targetIdNumber % 100
    const clickedChecklistGroupI = Math.floor(targetIdNumber / 100)

    const checklistGroupItem = checklistGroups[clickedChecklistGroupI]
    const checklistItem = checklistGroupItem.items[checklistItemI]
    const finishedItemsIds = checklistGroupItem.finishedItemsIds

    addTags(checklistGroupItem, checklistItem, selectedValue, targetIdNumber)

    handleShouldCreateNewGroup(finishedItemsIds, checklistGroupItem, targetIdNumber, clickedChecklistGroupI)
}

//ANCHOR adds tags
function addTags(checklistGroupItem, checklistItem, selectedValue, elementIdNum){
    removeTagsWithId(checklistGroupItem, elementIdNum)
    const newTags = getTagsFromChecklistItem(checklistItem, selectedValue)

    if(newTags === undefined)
        return

    for(tag of newTags){
        checklistGroupItem.collectedTags.push({name:tag, id:elementIdNum})
    }
}
function removeTagsWithId(checklistGroupItem, id){
    for(let i = 0; i < checklistGroupItem.collectedTags.length; i++){
        const tag = checklistGroupItem.collectedTags[i]
        if(tag.id === id){
            checklistGroupItem.collectedTags.splice(i, 1)
        } 
    }
}
function getTagsFromChecklistItem(checklistItem, value){
    if(checklistItem.type === "number"){
        return [checklistItem.name + ":" + value];
    }

    for (checklistItemItem of checklistItem.items){
        if (checklistItemItem.text === value){
            const selectedValue = checklistItemItem
            return selectedValue.tags
        }
    }
    return undefined
}


//ANCHOR handle should create new group
function handleShouldCreateNewGroup(finishedItemsIds, checklistGroupItem, targetIdNumber, clickedChecklistGroupI){
    if(allItemsFilled(finishedItemsIds, checklistGroupItem.itemAmountOnScreen)){
        resetGroupsFrom(clickedChecklistGroupI + 1)
        checklistGroupI = clickedChecklistGroupI
    }

    countChecklistItemAsFinished(finishedItemsIds, targetIdNumber)

    if(allItemsFilled(finishedItemsIds, checklistGroupItem.itemAmountOnScreen)){
        nextChecklistGroup()
    }

}
function allItemsFilled(finishedItemsIds, itemAmountOnScreen){
    return finishedItemsIds.length === itemAmountOnScreen
}
function countChecklistItemAsFinished(finishedItemsIds, itemIdNum){
    if(finishedItemsIds.indexOf(itemIdNum) === -1){
        finishedItemsIds.push(itemIdNum)
    }
}


//ANCHOR reset groups
function resetGroupsFrom(startFrom){
    resetGroupItemsAfter(startFrom)
    removeGroupELementsAfter(startFrom)
}
function resetGroupItemsAfter(startFrom){
    for(let i = startFrom; i < checklistGroups.length; i++){
        const checklistGroup = checklistGroups[i]
        checklistGroup.finishedItemsIds.length = 0
        checklistGroup.collectedTags.length = 0
    }
}
function removeGroupELementsAfter(startFrom){
    const groups = checklistsContainer.children
    const startingGroupLength = groups.length

    for(let i = startFrom; i < startingGroupLength; i++){
        checklistsContainer.removeChild(groups[startFrom])
    }
}

