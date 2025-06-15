# Projektdokumentation Interaktive Medien 4

Corina Engel corina.engel@stud.fhgr.ch & Ricarda Schirato ricarda.schirato@stud.fhgr.ch

## **Kurzbeschreibung des Projekts**

Unsere App richtet sich an Menschen über 50, die körperlich und geistig aktiv bleiben möchten. Denn mit zunehmendem Alter können bestimmte Fähigkeiten nachlassen. Dem lässt sich jedoch gezielt entgegenwirken. Durch kurze, alltagstaugliche Übungen in den Kategorien «Körperliche Aufgaben» und «Geistige Aufgaben» fördert die App Bewegung, Gedächtnis und Denkvermögen. Somit unterstützt die Nutzer:innen dabei, die Selbstständigkeit im Alltag möglichst lange zu erhalten.
Die Nutzer:innen werden zudem sanft motiviert, denn wer täglich aktiv bleibt, baut eine persönliche Tagesserie auf, die übersichtlich dargestellt und mitverfolgt werden kann.
Ob zu Hause, unterwegs oder zwischendurch: Die App ist einfach zu bedienen, stärkt gesunde Routinen und schafft bewusste Aktivitätsmomente im Alltag.
Learnings
Da Corina zu Beginn das Repository nicht lokal auf das MacBook, sondern auf eine externe Festplatte gespeichert hat, kam es zu Dateien die mit ._ beginnen. Diese sind eigentlich nutzlos, können zwar gelöscht werden, erscheinen beim nächsten GitHub push jedoch wieder automatisch. Jedoch sollten diese durch die Zusätze   "._*" & ".DS_Store" im Jason File gar nicht erst auf hochgeladen werden und für das Git ignoriert werden. Dies werden wir sicher beim nächsten Mal bereits zu Beginn in unseren Code aufnehmen, damit die nutzlosen Dateien gar nicht erst auf das Git gelangen. 

## Learnings

**-	Passwörter auf dem Server**

Einige Male ist uns der Fehler passiert, dass wir unsere Jason Datei mit Username und Passwort auf unser GitHub geladen haben. Da dies eine enorme Sicherheitslücke darstellt haben wir uns dazu entschieden, jeweils ein neues Repository zu erstellen und nicht einfach neue Identifikationen anzulegen. Zudem hätten wir auch nicht gewusst, wie man eine Datei vom Repository auf GitHub hätte löschen können und ob dies überhaupt unsere Sicherheitslücke gelöst hätte. Daher haben wir uns bewusst für einen Neustart entschieden. 

**-	Vorschau über den Live Server**

Zuerst öffneten wir unseren Code immer wie zuvor einfach über den Live Server. Dies führte aber dazu, dass es uns nicht möglich war, uns einzuloggen. Daher dachten wir zuerst, dass unser Login nicht funktioniert, dabei lag dies an der Live-Server-Ansicht bei der das Login generell nie möglich ist.
Umgekehrt sahen wir teilweise Bilder auf der Live Server Ansicht, jedoch nicht auf der der URL. Dies war für uns das Zeichen, dass wir diese noch nicht über einen Rechtsklick im Visual Studio Code auf den Server hochgeladen haben. 
Da uns die Erfahrung und Routine mit GitHub fehlt, wussten wir nicht, wie wir es schaffen, auf eine ältere, jedoch funktionierende Version zurückzugreifen und was es mit dem «Discard all Changes» auf sich hat. Um einmal mehr auf Nummer sicher zu gehen, hat Corina ihre lokalen Dateien und das Repository auf GitHub Desktop gelöscht, da sie Änderungen am Code vorgenommen hat, welche dazu führten, dass die Funktionen auf der Webseite nicht mehr funktionierten. Im Nachhinein wissen wir, dass dies nicht notwendig gewesen wäre und wir einfach die Funktion «Discard all Changes» auf dem GitHub Desktop hätten nutzen sollen. 

**-	Fragentypen**

Zu Beginn des Projekts hatten wir geplant, eine grössere Vielfalt an Fragetypen in die App zu integrieren. Im Laufe der Umsetzung zeigte sich jedoch, dass alle Antworten überprüfbar und eindeutig richtig sein müssen und mit der in der Datenbank vordefinierten Lösung übereinstimmen müssen. Daher haben wir uns bewusst auf Fragetypen mit klaren, kurzen Lösungen beschränkt, was die Gestaltungsmöglichkeiten etwas einschränkte, aber die technische Umsetzbarkeit deutlich erleichterte.
Unser Fragenkatalog ist in der Datenbank beliebig erweiterbar. Aktuell enthält er eine begrenzte, aber ausreichende Anzahl an Fragen, um die App mehrfach durchzuspielen und das Funktionsprinzip zu verstehen und zu testen.

**- Responsivness**

Uns bewusst, dass die Responsivität nicht in allen Bereichen zu 100% vorhanden ist. Da wir bereits stark mit anderen Funktionen unserer App, wie unter anderem den drei Datenbanken, dem Strike-Feature und den verschiedenen Anzeigemasken, gefordert waren, reichten unsere Kapazitäten am Ende leider nicht ganz aus, die Responsivness überall vollständig zu gewährleisten. Für künftige Projekte nehmen wir mit, diesen Aspekt frühzeitiger zu berücksichtigen.

## Schwierigkeiten

**-	Infomaniak**

Als Ricarda sich bei Infomaniak eine Domain und einen Webserver bestellen wollte, hatte sie erhebliche Probleme mit der Bestellung. Obwohl sie sich zwar als Studentin verifiziert hatte, funktionierte bei ihr der Studentenrabatt nicht. Zweimal hat sie beim Support ein Ticket erstellt. Bei beiden Tickets wurde sie einfach auf die notwendige Studentenverifizierung hingewiesen und das Ticket ohne Weiterbearbeitung abgeschlossen. Schlussendlich erhielt sie den Rabattcode durch eine andere Studentin, die wohl mit ihrem Ticket an eine kompetentere Person gelangt ist, welche ihr den Rabattcode direkt mitteilte.

**-	Profilbild**

Laut Mock Up und eigentlicher Planung war es vorgesehen, dass jede:r Nutzer:in beim Anlegen seines Accounts ein Profilbild hinterlegen kann. Dieses soll dann oben rechts nach der Anmeldung in der App angezeigt werden. Die Voraussetzungen, die Funktion zu integrieren haben wir zwar geschaffen, indem wir der Registrieren Seite ein weiteres Input Field hinzugefügt haben, dass es ermöglicht ein Bild hochzuladen. Auch in der Datenbank haben wir eine dafür vorgesehene Spalte hinzugefügt. Leider haben wir es aber nicht geschafft, das Bild schlussendlich in diese einzufügen. Daher kann nun zwar ein Bild beim Registrieren hochgeladen werden, aber es wird nur ein Platzhalterbild angezeigt. Selbst ein befreundeter Informatiker konnte uns bei dieser Angelegenheit auf die Schnelle nicht weiterhelfen. 

**-	Rätsel**

Ursprünglich hatten wir geplant, für die Kategorie «Rätsel» eigene Sudokus zu programmieren. Bei der ersten Recherche stellte sich jedoch schnell heraus, dass dies technisch deutlich aufwendiger ist als erwartet. Besonders auffällig war, dass die meisten Anleitungen und Lösungen in den Suchergebnissen auf Programmierung mit Python verweisen, inklusive komplexer Logik zur Generierung und Überprüfung gültiger Sudoku-Felder. Um ein funktionierendes Sudoku-System zu entwickeln, müssten wir nicht nur die algorithmischen Prinzipien dahinter genau verstehen, sondern auch in der Lage sein, diese korrekt umzusetzen. Dieser Aufwand hätte unsere technischen Kompetenzen und den Rahmen des Projekts überstiegen, daher haben wir uns entschieden, auf die Einbindung der Sudokus zu verzichten und stattdessen andere Rätsel in Textform zu verwenden.

**-	Github Desktop**

Das wie in den Learnings bereits erwähnte Löschen der lokalen Dateien und des Repository führte zu weiteren Problemen. Zuerst versuchte Corina das Repository genau auf dieselbe Weise zu klonen, wie zuvor. Dies funktionierte jedoch nicht wie gewünscht. GitHub Desktop konnte das Repository nicht klonen, da es jeweils unsichtbare Daten auf der externen Festplatte gefunden hat, die bereits existierten. Auch das Löschen dieser Dateien führte mehrmals zur selben Fehlermeldung. Auch Anweisungen direkt über das Terminal konnten die Fehlermeldung nicht umgehen. Durch zugezogenen Rat eines gelernten Informatikers konnte das Repository wiederhergestellt werden. Dazu musste das Repository lokal und direkt auf das MacBook gespeichert werden. Nun bestand aber noch das Problem, dass die Dateien doch nicht richtig mit dem Repository verknüpft waren und bei Änderungen im VS Code immer ein U hinter den Dateien erschien. Auch dieses Problem konnte mithilfe des Informatikers vorübergehend und durch Anweisungen im Terminal beseitigt werden. Als Corina jedoch in einem nächsten Schritt am Code weiterarbeiten wollte, bestand dasselbe Problem nochmals. Da wir jedoch sowieso nur an einem Code gleichzeitig arbeiten konnten, entschieden wir uns dazu, nicht noch weitere Zeit für die Behebung des Problems aufzuwenden und den restlichen Code noch mittels MacBook von Ricarda erstellen. 

**-	Verbindung mit der Datenbank**

Als wir im PHP-File über Visual Studio Code auf die Datenbank zugreifen wollten, funktionierte dies zunächst nicht. Auf der Website erschien lediglich die Fehlermeldung «Lade Aufgabe». Nach mehreren Stunden Fehlersuche erstellte Ricarda testweise eine neue Datenbanktabelle – und mit dieser funktionierte der Zugriff plötzlich einwandfrei. Die Ursache lag an einem von ChatGPT vorgeschlagenen Datentyp: Der in phpMyAdmin gesetzte Typ «ENUM» für die Aufgabenarten (Typ I und II) führte zu Problemen beim Datenbankzugriff. Zudem musste der Datenbankname in phpMyAdmin nochmals manuell angepasst werden, damit die Verbindung korrekt hergestellt werden konnte.

**- Schritteziel**

Die Grafik für das Schrittziel liess sich in dieser Form leider nicht umsetzen, da wir keinen Zugriff auf die Bewegungsdaten der UserInnen haben. Zudem hätte eine solche Umsetzung unser technisches Know-How überschritten.

## **Benutzte Ressourcen**

Als Grundlage für das Autentifizierungssystem diente uns natürlich die Boilerplate aus dem Unterricht. Diese mussten wir zwar zuerst noch einrichten und auf unsere Daten abstimmen. Ausserdem kam uns der Informatiker unseres Vertrauens zu Hilfe. Unter beim Klonen des Repositorys auf GitHub Desktop.
