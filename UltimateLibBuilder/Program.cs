using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace UltimateLibBuilder
{
    using System.Collections;
    using System.IO;
    using System.Reflection;
    using System.Runtime.ExceptionServices;
    using System.Xml.Serialization;

    using Yahoo.Yui.Compressor;

    class Program
    {
        private static Build BuildList;

        static void Main(string[] args)
        {
            // Loads the build list
            ReadBuildList();

            // Collect all files in this directory
            var dir = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var target = Path.Combine(dir, "CAMELOT.js");

            if (File.Exists(target))
            {
                File.Delete(target);
            }

            var files = new List<string>();

            files.Add(Path.Combine(dir, "CamelotCore.js"));

            foreach (var item in BuildList.Gameplay.Items)
            {
                files.Add(Path.Combine(dir, "Gameplay\\" + item + ".js"));
            }

            foreach (var item in BuildList.Grid.Items)
            {
                files.Add(Path.Combine(dir, "Grid\\" + item + ".js"));
            }

            foreach (var item in BuildList.Staff.Items)
            {
                files.Add(Path.Combine(dir, "Staff\\" + item + ".js"));
            }

            foreach (var item in BuildList.StockMarket.Items)
            {
                files.Add(Path.Combine(dir, "StockMarket\\" + item + ".js"));
            }

            foreach (var item in BuildList.Story.Items)
            {
                files.Add(Path.Combine(dir, "Story\\" + item + ".js"));
            }


            files.Add(Path.Combine(dir, "GDT.Hook.js"));


            if (BuildList.Optimizations.Enabled)
            {
                var yuc = new Yahoo.Yui.Compressor.JavaScriptCompressor();
                var sb = new StringBuilder();

                yuc.DisableOptimizations = BuildList.Optimizations.DisableOptimizations;
                yuc.LoggingType = LoggingType.None;
                yuc.LineBreakPosition = 1;
                yuc.CompressionType = BuildList.Optimizations.Compression? CompressionType.Standard : CompressionType.None;
                yuc.ObfuscateJavascript = BuildList.Optimizations.Obfuscation;
                yuc.PreserveAllSemicolons = BuildList.Optimizations.PreserveAllSemicolons;
                yuc.IgnoreEval = BuildList.Optimizations.IgnoreEval;
                
                try
                {
                    foreach (var file in files)
                    {
                        if (!File.Exists(file))
                        {
                            continue;
                        }


                        sb.Append(yuc.Compress(File.ReadAllText(file))); 
                    }

                    

                    using (var output = File.CreateText(target))
                    {
                        output.Write(sb.ToString());
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error " + ex.Message);
                }
            }
            else
            {
                const int chunkSize = 2 * 1024; // 2KB
                using (var output = File.Create(target))
                {
                    foreach (var file in files)
                    {
                        if (!File.Exists(file))
                        {
                            continue;
                        }
                        using (var input = File.OpenRead(file))
                        {
                            var buffer = new byte[chunkSize];
                            int bytesRead;
                            while ((bytesRead = input.Read(buffer, 0, buffer.Length)) > 0)
                            {
                                output.Write(buffer, 0, bytesRead);
                            }
                        }
                    }
                }
            }

        }

        static void ReadBuildList()
        {
            var dir = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var file = Path.Combine(dir, "BuildList.xml");
            var bf = new XmlSerializer(typeof(Build));
            using (var fs = new StreamReader(file))
            {
                BuildList = bf.Deserialize(fs) as Build;
            }
            
        }

        static void WriteBuildList()
        {
            var dir = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var file = Path.Combine(dir, "BuildList.xml");

            var xml = new XmlSerializer(typeof(Build));
            using (var sw = new StreamWriter(file))
            {
                var b = new Build();
                b.Gameplay.Items = new[] { "iuj", "iojo", "oijoi" };
                b.Grid.Items = new[] { "iuj", "iojo", "oijoi" };
                b.Staff.Items = new[] { "iuj", "iojo", "oijoi" };
                b.StockMarket.Items = new[] { "iuj", "iojo", "oijoi" };
                b.Story.Items = new[] { "iuj", "iojo", "oijoi" };
                xml.Serialize(sw, b);
            }

        }
    }
}
