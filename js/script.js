		//Initiates the conversion process
		function init()
		{
			//Read the input Text Feild
			textField=document.getElementById("inputText");
			var text=textField.value;

			/*
			The major process is divided into two main steps:
				1. Insert Appropriate Newline or Line Breaks
				2. Insert Appropriate Tabs
			*/

			//Insert required Line breaks
			text=(preProcess(text));

			//Filter the necessary spaces
			text =clearSpaces(text);

			//Remove unwanted linebreaks
			text=text.replace(/\r?\n{2,}|\r{2,}/g,'\n');

			text=midProcess(text);

			//Insert appropriate Tabs
			text=insertTabs(text);

			//Set the value to the text Field
			textField.value=text;
		}

		//Filter certain spaces
		function myTrimmer(text)
		{
			test="";
			singleQInside=false;
			doubleQInside=false;

			for(i=0;i<text.length;i++)
			{
				if(text[i]=='"')
					doubleQInside=doubleQInside==true?false:true;
				if(text[i]=="'")
					singleQInside=singleQInside==true?false:true;

				if(text[i]!=' ' || doubleQInside || singleQInside )
				{
					test+=text[i];
				}
			}
			return test;
		}

		//Clear unwanted Spaces
		function clearSpaces(text)
		{
			temp="";
			while(true)
			{
				index=text.indexOf('\n');

				if(index == -1)
					break;

				substr=text.substring(0,index+1).trim();

				if(substr.indexOf("'")!=-1 || substr.indexOf('"')!=-1)
					temp+=myTrimmer(substr)+"\n";
				else
					temp+=substr.replace(/ {2,}/g," ")+"\n";

				text=text.substring(text.indexOf('\n')+1,text.length);
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
				
				if(sym == "}" || (sym == ";" && value[0][pos-3] =="}" ))
					indent-=1;

				finalTex+=getIndent(indent)+value[0];

				if(sym == "{")
					indent+=1;

				text=text.substring(pos,text.length);
			}	
			return finalTex;
		}

		//Other advacements can be added here
		function midProcess(text)
		{
			postText="";
			while(true)
			{
				eindex=text.indexOf("}");

				//for now
				if(eindex==-1)
					break;

				if(eindex < (text.length-2) && text[eindex+2]==";")
				{
					postText+=text.substring(0,eindex)+"};";
					if(eindex+3 >= text.length)
						text="";
					else
						text=text.substring(eindex+3,text.length);
				}
			
			}

			return postText+text;
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
