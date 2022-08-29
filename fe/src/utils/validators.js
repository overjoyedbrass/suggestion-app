export function nameValidator(name){
    if(name.length < 3){
        return "Must be atleast 3 characters long";
    }
    for(const l of name){
        if(l === " "){
            return "Must be 1 word"
        }
        else if(!isNaN(l)){
            return "Cannot contain any numbers";
        }
    }
    return ""
}

export function addressValidator(input){
    if(input.length < 3){
        return "Must be atleast 3 characters long";
    }
    return ""
}

export function zipValidation(zip){
    if(isNaN(zip)){
        return "Must be a number";
    }
    if(zip.toString().length !== 5){
        return "Zipcode is 5 digit number";
    }
	if(zip.includes(" ")){
		return "Do not use whitespace"
	}
    return "";
}

export function fileValidation(file){
    const MAX_FILE_SIZE = 1000000;
    const ACCEPTED=["jpeg", "jpg", "png", "gif"]
    if(file === null){
        return ""
    }
    if(file === undefined){
        return "File not selected"
    }
    const fileType = file.type.split("/")[1]
    if(!ACCEPTED.includes(fileType)){
        return `.${fileType} is not allowed file type`
    }

    if(file.size > MAX_FILE_SIZE){
        return "File size must be less than 1 MB"
    }
    return ""
}