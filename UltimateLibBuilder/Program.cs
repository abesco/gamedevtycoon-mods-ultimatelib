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

    class Program
    {
        private static Build BuildList;

        static void Main(string[] args)
        {
            // Loads the build list
            ReadBuildList();

            // Collect all files in this directory
            var dir = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var target = Path.Combine(dir, "UltimateLib.js");

            if (File.Exists(target))
            {
                File.Delete(target);
            }

            var files = new List<string>();

            files.Add(Path.Combine(dir, "GDT.Hook.js"));

            foreach (var item in BuildList.Core.Items)
            {
                files.Add(Path.Combine(dir, "core\\" + item + ".js"));
            }

            foreach (var item in BuildList.Libraries3rd.Items)
            {
                files.Add(Path.Combine(dir, "3rd\\" + item + ".js"));
            }

            foreach (var item in BuildList.Libraries.Items)
            {
                files.Add(Path.Combine(dir, "libs\\" + item + ".js"));
            }

            

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
                b.Core.Items = new[] { "iuj", "iojo", "oijoi" };
                b.Libraries.Items = new[] { "iuj", "iojo", "oijoi" };
                b.Libraries3rd.Items = new[] { "iuj", "iojo", "oijoi" };
                xml.Serialize(sw, b);
            }

        }
    }
}
