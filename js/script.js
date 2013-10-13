		//Initiates the conversion process
		function init()
		{
			//Read the input Text Feild
			textField=document.getElementById("inputText");
			var text=textField.value;

			//Filter the necessary spaces
			text=process(text);

			//Removes the new line
			text=text.replace(/\r?\n|\r/g,'');

			/*The major process is divided into two main steps:
				1. Insert Appropriate Newline or Line Breaks
				2. Insert Appropriate Tabs
			*/
			text=insertTabs(preProcess(text));

			//Set the value to the text Field
			textField.value=text;
		}

		//Clear the Spaces, could have been done using Regex as well
		// string.replace(/ /g,"")
		function process(text)
		{
			temp="";
			inside=false;
			for(i=0;i<text.length;i++)
			{
				//Checking for string values, they should not be modified
				//example alert("my string");
				if(text[i]=="'" || text[i]=='"')
				{
					inside=inside==true?false:true;
				}
				if(text[i]!=" ")
				{
					temp+=text[i];
				}else if(inside)
				{
					temp+=text[i];
				}
			}
			return temp;
		}

		//Lazy Programming :)
		function getMin(x,y,z)
		{
			if(x==-1)
				x=10000000;
			if(y==-1)
				y=10000000;
			if(z==-1)
				z=10000000;

			if(x<y)
				if(x<z)
					return x;
				else
					return z;
			else
				if(y<z)
					return y;
				else
					return z;
		}

		//Provides a Line with this end position
		function getLine(text)
		{
			pos=text.indexOf("\n");
			if (pos==-1)
				return ["",-1];
			return [text.substring(0,pos+1),pos];
		}


		//Provides sufficient Indentation
		function getIndent(indent)
		{
			tab=""
			for(i=0;i<indent;i++)
			{
				tab+="    ";
			}

			return tab;
		}


		function processSpaces(text)
		{
				text.replace(/ /g,"");
		}

		//Responsible to insert the required amount to tabs
		function insertTabs(text)
		{
			finalTex="";
			indent=0;
			while(true)
			{
				value=getLine(text);
				if(value[1] == -1)
					break;

				pos=value[1]+1;
				sym=value[0][pos-2];
				
				if(sym == "}")
					indent-=1;

				finalTex+=getIndent(indent)+value[0];

				if(sym == "{")
					indent+=1;

				text=text.substring(pos,text.length);
			}	
			return finalTex;
		}

		function preProcess(text)
		{
			postText="";
			while(true)
			{
				sindex=text.indexOf(";");
				bindex=text.indexOf("{");
				eindex=text.indexOf("}");
				if(sindex==-1 && bindex==-1 && eindex == -1)
					break;

				index=getMin(sindex,bindex,eindex);
				temp=text.substring(0,index+1);
				if(eindex==index && temp.length > 1)
					postText+=text.substring(0,index)+"\n"+"}"+"\n";
				else
					postText+=text.substring(0,index+1)+"\n";

				text=text.substring(index+1,text.length);
			}
			return postText+text;
		}
