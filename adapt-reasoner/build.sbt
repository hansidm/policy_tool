resolvers in ThisBuild += Resolver.sonatypeRepo("snapshots")

name := """adapt-reasoner"""
organization := "edu.rpi.tw.adapt"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.13.1"
val owlapiVersion = "5.1.13"
val hermitVersion = "1.4.5.519"

libraryDependencies += guice
libraryDependencies += "edu.rpi.tw.adapt" %% "adapt-models" % "1.0-SNAPSHOT"
libraryDependencies += "edu.rpi.tw.twks" % "twks-rest-client" % "1.0.4"
libraryDependencies += "net.sourceforge.owlapi" % "owlapi-distribution" % owlapiVersion
libraryDependencies += "net.sourceforge.owlapi" % "org.semanticweb.hermit" % hermitVersion